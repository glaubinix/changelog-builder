from changelog_builder.epics.abstract_epic_type import AbstractEpicType


class ConfigEpicType(object):

    def parse(self, config, commits):
        return commits

AbstractEpicType.register(ConfigEpicType)

if __name__ == '__main__':
    print 'Subclass:', issubclass(ConfigEpicType, AbstractEpicType)
    print 'Instance:', isinstance(ConfigEpicType(), AbstractEpicType)
