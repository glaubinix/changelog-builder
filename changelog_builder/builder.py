class Builder:

    def __init__(self, log_parser):
        self.log_parser = log_parser

    def set_previous_log(self, changelog):
        self.previous_log = changelog

    def set_current_log(self, changelog):
        self.current_log = changelog
