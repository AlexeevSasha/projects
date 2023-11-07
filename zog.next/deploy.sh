#!/usr/bin/env bash
ssh root@uliy "cd /apps/partner/ && docker-compose build && docker stop amrita_partner && docker rm amrita_partner && docker-compose up -d"