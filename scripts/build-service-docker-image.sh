#!/bin/bash

docker build -t backend:latest ../back
docker build -t frontend:latest ../front
docker build -t indexer:latest ../indexer
docker build -t reporting:latest ../reporting

