class Builder:


    def __init__(self, log_parser):
        self.log_parser = log_parser
        self.previous_log = {}
        self.current_log = {}

    def set_previous_log(self, changelog):
        self.previous_log = self.log_parser.parse(changelog)

    def set_current_log(self, changelog):
        self.current_log = self.log_parser.parse(changelog)

    def get_diff(self):
        diff_keys = set(self.current_log) - set(self.previous_log.keys())

        diff = {}
        for key in diff_keys:
            diff[key] = self.current_log[key]

        return diff
