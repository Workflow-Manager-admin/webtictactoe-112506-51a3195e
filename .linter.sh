#!/bin/bash
cd /home/kavia/workspace/code-generation/webtictactoe-112506-51a3195e/webtictactoe
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

