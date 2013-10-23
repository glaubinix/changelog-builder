from changelog_builder.epics import ConfigEpicType, NullEpicType


class EpicTypeFactory:

    def get_epic_type(self, identifier):
        if 'config' == identifier:
            return ConfigEpicType()

        return NullEpicType()
