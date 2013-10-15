#!/usr/bin/python

import os
from changelog_builder import VersionControlFactory

factory = VersionControlFactory()
vcs = factory.get_vcs('git')

output = vcs.get_log(os.path.dirname(os.path.realpath(__file__)))

print output
