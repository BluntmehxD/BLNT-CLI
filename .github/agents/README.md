# DevOps Agents

This directory contains the definitions for all DevOps agents that work together to build, test, secure, and deploy BLNT-CLI.

## Agent Team

### 1. [CI/CD Agent](ci-cd-agent.md)
**Role:** Pipeline Orchestration  
Designs and maintains CI/CD pipelines, coordinates all automation workflows.

### 2. [Build & Test Agent](build-test-agent.md)
**Role:** Quality Assurance  
Ensures code quality through comprehensive testing across all platforms.

### 3. [Security Agent](security-agent.md)
**Role:** Security & Compliance  
Scans for vulnerabilities, enforces security policies, and maintains compliance.

### 4. [Code Quality Agent](code-quality-agent.md)
**Role:** Code Standards  
Enforces coding standards, maintains code quality metrics.

### 5. [Deployment Agent](deployment-agent.md)
**Role:** Release Management  
Manages releases and deployments to various distribution channels.

### 6. [Monitoring Agent](monitoring-agent.md)
**Role:** Health Tracking  
Monitors system health, tracks metrics, and sends alerts.

### 7. [Documentation Agent](docs-agent.md)
**Role:** Documentation  
Maintains all project documentation and generates API docs.

## How They Work Together

See [TEAM_COORDINATION.md](TEAM_COORDINATION.md) for details on how these agents coordinate.

## Workflow Execution

Each agent has corresponding GitHub Actions workflows in `.github/workflows/`:

- `ci-cd.yml` - Main orchestration (CI/CD Agent)
- `build-test.yml` - Build and test (Build & Test Agent)
- `security.yml` - Security scanning (Security Agent)
- `code-quality.yml` - Quality checks (Code Quality Agent)
- `deployment.yml` - Release deployment (Deployment Agent)
- `monitoring.yml` - Health monitoring (Monitoring Agent)

## Documentation

For more information:

- **Overview:** See [DEVOPS.md](../../DEVOPS.md) in the root
- **Quick Reference:** See [DEVOPS_QUICK_REFERENCE.md](../../DEVOPS_QUICK_REFERENCE.md)
- **Coordination:** See [TEAM_COORDINATION.md](TEAM_COORDINATION.md)

## Agent Development

These agents are defined as markdown documents that describe their roles, responsibilities, and skills. They are implemented through GitHub Actions workflows that automate their tasks.

To add a new agent:
1. Create a new markdown file in this directory
2. Define the agent's role and responsibilities
3. Create corresponding GitHub Actions workflow
4. Update TEAM_COORDINATION.md
5. Update this README

---

**The DevOps Team - Working Together to Build BLNT-CLI** 🚀
