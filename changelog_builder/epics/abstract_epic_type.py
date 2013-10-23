import abc


class AbstractEpicType(object):
    __metaclass__ = abc.ABCMeta

    @abc.abstractmethod
    def parse(self, config, commits):
        return

