import abc


class AbstractLogParser(object):
    __metaclass__ = abc.ABCMeta

    @abc.abstractmethod
    def parse(self):
        return

