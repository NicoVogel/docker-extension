#!/bin/bash

# remove wrong placed node bash execution instruction
sed -i -e 's/\#\!\/usr\/bin\/env node//g' $1

# add the node bash execution instrution at the file start
echo -e "#!/usr/bin/env node\n$(cat $1)" > $1

# source: https://gist.github.com/DarrenN/8c6a5b969481725a4413
if [[ -z "${PACKAGE_VERSION}" ]]; then
  PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g')
else
  PACKAGE_VERSION=${PACKAGE_VERSION}
fi

sed -i -e "s/\$PACKAGE_VERSION/$PACKAGE_VERSION/g" $1


