# Project Overview

## What is this?

An Active Directory security and networking lab built using VirtualBox to simulate a small enterprise environment.

The lab was designed to explore system administration, identity management, networking fundamentals, and introductory
security concepts by building a Windows Server domain environment with connected client and attacker machines.

The environment included:

- A Windows Server 2019 Domain Controller
- A Windows 10 domain workstation
- A Kali Linux security testing machine

The goal was to understand how enterprise networks are structured, how users and policies are managed, and how
security events can be monitored and investigated.

---

## Enterprise Network Setup

### Domain Controller Configuration

A Windows Server 2019 machine was configured as the Domain Controller by installing Active Directory Domain
Services and creating a local enterprise-style domain environment.

DNS configuration and network troubleshooting were required to establish proper communication between the Domain
Controller and workstation, providing practical experience with how domain environments rely on networking infrastructure.

### Workstation Integration

A Windows 10 workstation was joined to the Active Directory domain and configured to communicate with the Domain Controller.

This process involved troubleshooting IP addressing, DNS resolution, and connectivity issues to ensure successful domain authentication.

### Identity and Access Management

User management was implemented by creating:

- An administrative account for system management
- Employee accounts representing standard users

Users were organized into Organizational Units (OUs) to simulate how businesses separate departments and manage permissions.

### Group Policy Configuration

Basic Group Policy settings were configured to apply centralized security and management controls, including:

- Account password requirements
- Account lockout policies
- Windows update settings

---

# Security Scenarios

## Simulated Credential Attack and Detection

A Kali Linux machine was added to the network to simulate an external security testing environment.

Authentication attacks were performed against the domain environment to explore how weak credential practices
can be exploited. Failed authentication attempts were then investigated using Windows Event Viewer on the Domain
Controller to understand how security events are recorded and monitored.

This demonstrated the relationship between offensive security techniques and defensive monitoring practices.

## Network Traffic Analysis

Wireshark was used to inspect network traffic and explore how unencrypted HTTP communication can expose information transferred across a network.

This provided practical insight into why modern applications rely on encryption protocols such as HTTPS.

---

## Lessons Learned

This project provided hands-on experience with:

- Active Directory administration
- DNS and network troubleshooting
- User and organizational management
- Group Policy configuration
- Security event monitoring
- Basic network traffic analysis

The lab helped bridge the gap between theoretical cybersecurity concepts and practical enterprise IT infrastructure by demonstrating how systems are built, attacked, and monitored.
