from changelog_builder.log_parser.abstract_log_parser import AbstractLogParser


class GitLogParser(object):

    def parse(self, log):
        return

AbstractLogParser.register(GitLogParser)

if __name__ == '__main__':
    print 'Subclass:', issubclass(GitLogParser, AbstractLogParser)
    print 'Instance:', isinstance(GitLogParser(), AbstractLogParser)
