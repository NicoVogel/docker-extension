#!/bin/bash

# remove wrong placed node bash execution instruction
sed -i -e 's/\#\!\/usr\/bin\/env node//g' $1

# add the node bash execution instrution at the file start
echo -e "#!/usr/bin/env node\n$(cat $1)" > $1
