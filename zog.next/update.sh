#!/usr/bin/env bash
# shellcheck disable=SC2164
cd /apps/partner
docker build -t amrita-partner --build-arg NEXT_PUBLIC_CLIENTVAR=clientvar .