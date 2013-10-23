import abc


class AbstractVcs(object):
    __metaclass__ = abc.ABCMeta

    @abc.abstractmethod
    def get_log(self, path, branch, min_revision):
        return

    @abc.abstractmethod
    def get_min_revision(self, path, old_branch, new_branch):
        return
