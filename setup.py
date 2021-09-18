import pathlib
from setuptools import setup, find_packages

# The directory containing this file
HERE = pathlib.Path(__file__).parent

# The text of the README file
README = (HERE / "README.md").read_text()

# This call to setup() does all the work
setup(
    name="leswell-frontend-kit",
    version="0.0.4",
    description="Frontend solutions (simple js module loader, builtin modules, ...)",
    long_description=README,
    long_description_content_type="text/markdown",
    url="https://github.com/slevi123/leswell-frontend-kit",
    author="Leswell",
    author_email="simofilevente@gmail.com",
    license="GPL",
    classifiers=[
        "Development Status :: 2 - Pre-Alpha",
        "Environment :: Console",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: GNU General Public License v3 or later (GPLv3+)",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: JavaScript",
    ],
    packages=find_packages(exclude=("test",)),
    include_package_data=True,
    install_requires=["jinja2", "jinja2_simple_tags"],
    entry_points={
        "console_scripts": [
            "lesjs=lesjs.module:main",
        ]
    },
)