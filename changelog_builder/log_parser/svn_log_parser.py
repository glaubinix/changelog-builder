from changelog_builder.log_parser.abstract_log_parser import AbstractLogParser
import re


class SvnLogParser(object):
    def parse(self, log):
        return self.parse_commit(log)


    def parse_commit(self, commit):
        return {'1': 'test'}


AbstractLogParser.register(SvnLogParser)

if __name__ == '__main__':
    print 'Subclass:', issubclass(SvnLogParser, AbstractLogParser)
    print 'Instance:', isinstance(SvnLogParser(), AbstractLogParser)
