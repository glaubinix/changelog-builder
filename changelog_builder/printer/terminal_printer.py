class TermainalPrinter:

    def print_change_log(self, grouped_commits):
        for epic in grouped_commits:
            print epic
            for commit in grouped_commits[epic]:
                print commit

            print "\n"
