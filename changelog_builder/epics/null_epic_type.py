from changelog_builder.epics.abstract_epic_type import AbstractEpicType


class NullEpicType(object):
    def parse(self, config, commits):
        return commits

AbstractEpicType.register(NullEpicType)

if __name__ == '__main__':
    print 'Subclass:', issubclass(NullEpicType, AbstractEpicType)
    print 'Instance:', isinstance(NullEpicType(), AbstractEpicType)
