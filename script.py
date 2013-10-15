#!/usr/bin/python

import os
from changelog_builder import VersionControlFactory, Builder
from changelog_builder.log_parser import LogParserFactory

vcs_factory = VersionControlFactory()
vcs = vcs_factory.get_vcs('git')

log_parser_factory = LogParserFactory()
log_parser = log_parser_factory.get_parser('git')

output = vcs.get_log(os.path.dirname(os.path.realpath(__file__)), 'master')

builder = Builder(log_parser)
builder.set_previous_log(output)
print output
