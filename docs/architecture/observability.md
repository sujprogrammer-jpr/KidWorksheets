# Observability & Monitoring Architecture — KidWorksheets

> **Document Type:** Infrastructure — Observability
> **Version:** 1.0
> **Date:** 2026-07-23
> **Stack:** Loki + OpenTelemetry + Prometheus + Grafana (all open-source, self-hosted)

---

## Overview

All monitoring runs on the Linux server alongside the backend microservices. No paid monitoring tools used. The full stack is 100% open-source.

```
All Services (Express.js + .NET Core)
         │ emit logs + traces + metrics
         ▼
┌─────────────────────────────────────────────┐
│          OBSERVABILITY PIPELINE             │
│                                             │
│  OpenTelemetry Collector  ←── all services  │
│         │                                   │
│    ┌────┴──────┬──────────┐                 │
│    ▼           ▼          ▼                 │
│  Loki        Prometheus  Tempo              │
│  (logs)      (metrics)   (traces)           │
│    └──────────┴──────────┘                  │
│              │                              │
│           Grafana                           │
│        (unified dashboard)                  │
└─────────────────────────────────────────────┘
```

---

## Tools

| Tool | Version | Purpose | Port |
|---|---|---|---|
| **Grafana** | Latest OSS | Unified dashboard for all observability data | 3100 |
| **Loki** | Latest | Log aggregation and querying | 3101 |
| **Prometheus** | Latest | Metrics collection, alerting rules | 9090 |
| **OpenTelemetry Collector** | Latest | Receive + route traces, metrics, logs | 4317 (gRPC), 4318 (HTTP) |
| **Grafana Tempo** | Latest | Distributed trace storage | 3200 |
| **Alertmanager** | Latest | Alert routing → Email / Slack / SMS | 9093 |

---

## What Each Tool Does

### Grafana
- Central dashboard: ALL metrics, logs, traces in one place
- Pre-built dashboards for each microservice
- Alerting rules: email/Slack when thresholds breached
- Data sources: Loki + Prometheus + Tempo

### Loki
- Receives structured JSON logs from all services
- Queried via LogQL in Grafana
- Lightweight — does not index log content, only labels
- Labels used: `service`, `level`, `env`, `traceId`

### Prometheus
- Scrapes `/metrics` endpoint on each service every 15s
- Stores time-series metrics
- Alerting rules: `alert.rules.yml`
- Exporters:
  - `node_exporter` → Linux server CPU, memory, disk, network
  - `redis_exporter` → Redis hit rate, memory, connections
  - `mysql_exporter` → MySQL query performance, connections
  - `blackbox_exporter` → HTTP endpoint uptime checks

### OpenTelemetry Collector
- Receives traces from all services (OTel SDK)
- Routes traces to Tempo, metrics to Prometheus, logs to Loki
- Single ingestion point — services only need to know OTel endpoint

### Grafana Tempo
- Stores distributed traces
- Links traces to Loki logs via `traceId`
- Allows full request journey across all microservices

---

## Instrumentation per Service

### Express.js Services (Auth, Share, File, Notification)
```typescript
// opentelemetry setup in each Express service
import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({ url: 'http://localhost:4318/v1/traces' }),
  metricReader: new PrometheusExporter({ port: 9464 }),  // scraped by Prometheus
});
sdk.start();
```

### .NET Core Services (Worksheet, Progress, Admin)
```csharp
// Program.cs
builder.Services.AddOpenTelemetry()
    .WithTracing(b => b
        .AddAspNetCoreInstrumentation()
        .AddEntityFrameworkCoreInstrumentation()
        .AddOtlpExporter(opts => opts.Endpoint = new Uri("http://localhost:4317")))
    .WithMetrics(b => b
        .AddAspNetCoreInstrumentation()
        .AddPrometheusExporter());
```

### Log Format (Structured JSON — all services)
```json
{
  "timestamp": "2026-07-23T10:00:00.000Z",
  "level": "INFO",
  "service": "worksheet-service",
  "version": "1.0.0",
  "env": "production",
  "traceId": "4bf92f3577b34da6a3ce929d0e0e4736",
  "spanId": "00f067aa0ba902b7",
  "userId": "usr_abc123",
  "action": "GET_WORKSHEET_LIST",
  "classId": "cls_001",
  "duration_ms": 45,
  "statusCode": 200,
  "message": "Worksheets fetched successfully"
}
```

---

## Grafana Dashboards

### Dashboard 1: Platform Overview
- Total requests / minute (across all services)
- Overall error rate (%)
- Average API latency (p50, p95, p99)
- Active users (last 24h)
- Service health status (green/red per service)

### Dashboard 2: Auth Service
- Login success rate
- Login failures (wrong credentials, expired token)
- Child PIN verification rate
- JWT refresh rate
- Active sessions

### Dashboard 3: Worksheet Service
- Worksheets fetched / minute
- Worksheet creation rate
- Most-accessed subjects (bar chart)
- Slow queries (> 500ms)
- Cache hit/miss rate (Redis)

### Dashboard 4: Progress Service
- Submissions / hour
- Average score across all submissions
- Worksheet completion rate
- AI auto-scoring requests / hour
- Failed score calculations

### Dashboard 5: AI/n8n Service
- Worksheet generation requests / hour
- AI generation success rate
- Average generation time (seconds)
- Gemini API response time
- Image analysis success rate

### Dashboard 6: Infrastructure
- Linux server CPU usage (%)
- Linux server memory usage (%)
- Disk usage (%)
- Redis memory + hit rate
- MySQL query rate + slow queries
- Network in/out (MB/s)

### Dashboard 7: Notifications
- Push notifications sent / hour
- FCM delivery success rate
- APNS delivery success rate
- Notification queue depth (SQS)

### Dashboard 8: Logs Explorer
- Live log stream per service
- Error log filter (level=ERROR)
- Search by traceId, userId, action

---

## Alert Rules

| Alert | Condition | Severity | Action |
|---|---|---|---|
| High error rate | Error rate > 5% for 5 min | 🔴 Critical | Email + Slack |
| API latency spike | p95 latency > 2s for 5 min | 🟡 Warning | Slack |
| Service down | Health check fails 3× in a row | 🔴 Critical | Email + Slack |
| High CPU | CPU > 90% for 10 min | 🟡 Warning | Slack |
| Low disk space | Disk usage > 85% | 🟡 Warning | Email |
| Redis memory | Redis memory > 80% | 🟡 Warning | Slack |
| SQS queue depth | > 1000 messages for 5 min | 🟡 Warning | Slack |
| AI generation failure | Failure rate > 20% for 10 min | 🟡 Warning | Slack |
| DB connection pool | Connections > 80% of max | 🟡 Warning | Slack |

---

## Mobile App Observability

The mobile app also emits telemetry:
- **Crashes:** via `@sentry/react-native` (Sentry is still used for mobile crash reporting — free tier)
- **Performance:** React Native Performance Monitor (development only)
- **Custom events:** Firebase Analytics (screen views, worksheet starts, completions, errors)
- **API call tracking:** TanStack Query error callbacks → log to backend

---

## Setup on Linux Server

```bash
# Install all observability tools via docker-compose alternative: direct binaries

# 1. Loki
wget https://github.com/grafana/loki/releases/latest/download/loki-linux-amd64.zip
unzip loki-linux-amd64.zip

# 2. Prometheus
wget https://github.com/prometheus/prometheus/releases/latest/download/prometheus-linux-amd64.tar.gz
tar xzf prometheus-linux-amd64.tar.gz

# 3. Grafana
sudo apt-get install grafana

# 4. Tempo
wget https://github.com/grafana/tempo/releases/latest/download/tempo_linux_amd64.zip

# 5. OTel Collector
wget https://github.com/open-telemetry/opentelemetry-collector-releases/releases/latest/download/otelcol-contrib_linux_amd64.tar.gz

# Start all with PM2
pm2 start grafana-server --name grafana
pm2 start loki --name loki
pm2 start prometheus --name prometheus
pm2 start tempo --name tempo
pm2 start otelcol-contrib --name otelcol
```

---

*Observability Version: 1.0 | Date: 2026-07-23*
