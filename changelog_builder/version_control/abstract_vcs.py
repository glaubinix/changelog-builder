import abc


class AbstractVcs(object):
    __metaclass__ = abc.ABCMeta

    @abc.abstractmethod
    def get_log(self):
        return
