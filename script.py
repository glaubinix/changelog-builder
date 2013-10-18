#!/usr/bin/python

import sys
from changelog_builder.commit_processor.commit_ignore import CommitIgnore
from config import config
from changelog_builder import VersionControlFactory, Builder
from changelog_builder.log_parser import LogParserFactory

if len(sys.argv) < 2:
    raise Exception('Missing argument: Usage python script.py old_branch new_branch')

vcs_factory = VersionControlFactory()
vcs = vcs_factory.get_vcs(config['vcs'])

log_parser_factory = LogParserFactory()
log_parser = log_parser_factory.get_parser(config['vcs'])

output = vcs.get_log(config['path'], sys.argv[1])

builder = Builder(log_parser)
builder.set_previous_log(output)

output = vcs.get_log(config['path'], sys.argv[2])

builder.set_current_log(output)

diff = builder.get_diff()

commit_ignore = CommitIgnore(config)
diff = commit_ignore.process(diff)
print diff
