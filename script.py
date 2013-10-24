#!/usr/bin/python

import sys
from changelog_builder import *
from config import config

if len(sys.argv) < 2:
    raise Exception('Missing argument: Usage python script.py old_branch new_branch')

vcs_factory = VersionControlFactory()
vcs = vcs_factory.get_vcs(config['vcs'])

log_parser_factory = LogParserFactory()
log_parser = log_parser_factory.get_parser(config['vcs'])

min_revision = vcs.get_min_revision(config['path'], sys.argv[1], sys.argv[2])

output = vcs.get_log(config['path'], sys.argv[1], min_revision)

builder = Builder(log_parser)
builder.set_previous_log(output)

output = vcs.get_log(config['path'], sys.argv[2], min_revision)

builder.set_current_log(output)

diff = builder.get_diff()

commit_ignore = CommitIgnore(config)
diff = commit_ignore.process(diff)

unique_issues = UniqueIssues(config)
diff = unique_issues.process(diff)

commit_length = CommitLength(config)
diff = commit_length.process(diff)

epic_type_factory = EpicTypeFactory()
epic_type = epic_type_factory.get_epic_type(config['epic_type'])

grouped_diff = epic_type.parse(config, diff)

printer = TermainalPrinter()
printer.print_change_log(grouped_diff)
