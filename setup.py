# -*- coding: utf-8 -*-

import os
import re
from setuptools import setup, find_packages

here = os.path.dirname(__file__)
with open(os.path.join(here, 'changelog_builder', '__init__.py')) as v_file:
    package_version = re.compile(r".*__version__ = '(.*?)'", re.S).match(v_file.read()).group(1)


def read(fname):
    return open(os.path.join(here, fname)).read()

requirements = []

test_requires = [
    'WebTest',
    'nose',
    'coverage',
    ]

extras_require = {
    'docs': ['sphinx'],
    'tests': test_requires
}

setup(
    name='Changelog Builder',
    version="0.1.0",
    description='svn / git changelog builder',
    long_description=(
        read('README.md')
        + '\n\n' +
        read('CHANGELOG.md')
    ),
    keywords='changelog builder',
    author='Stephan Vock',
    author_email='stephan.vock@gmail.com',
    url='https://github.com/glaubinix/changelog-builder',
    license="MIT License",
    classifiers=[

        ],
    packages=find_packages(),
    install_requires=requirements,
    tests_require=test_requires,
    test_suite='tests',
    include_package_data=True,
    zip_safe=False,
    extras_require=extras_require,
    )
