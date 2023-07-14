#!/bin/bash

docker build -t backend:latest ../back
docker build -t indexer:latest ../indexer
docker build -t reporting:latest ../reporting

