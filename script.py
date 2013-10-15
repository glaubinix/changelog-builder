#!/usr/bin/python

import commands
import subprocess
import os
import sys

pr = subprocess.Popen("/usr/bin/git log", cwd=os.path.realpath(__file__),
                      shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
(out, error) = pr.communicate()

print "Error : " + str(error)
print "out : " + str(out)
