import sys, getopt
from pathlib import Path
import os
_script_path_ = Path(os.path.abspath(__file__)).resolve()
sys.path.append(str(_script_path_.parent.parent))
# chdir(str(Path.cwd().parent))
# print(sys.path)

from lesjs.exceptions import JsModuleNotFoundError
import json
from pathlib import Path
from json import loads

class Module:
    """One javascript file to render"""
    dependencies = []
    # print("-----------gggggggg-------", Path(os.path.abspath(__file__)).parent.parent)
    import_paths= [ Path.cwd(),
        _script_path_.parent.parent/ "builtin_modules"
        # TODO: factor out the script path (Path(os.path.abspath(__file__)).resolve())
    ]

    print(import_paths)

    # print(import_paths)

    def __init__(self, file_path, extra_paths=[]) -> None:

        # resolving file_path
        if isinstance(file_path, str):
            file_path = Path(file_path)
        self.file_path = file_path.resolve()

        self.content_block = ""
        # self.parents = []
        self.dependency_names = self.read_dependency_list()

        self.resolve_import_paths(extra_paths)
        self.resolve_dependecies()
        # self.render_final()

    def resolve_import_paths(self, extra_paths):
        """Adds the file path and the extra paths to the import paths"""
        # TODO: only add once, not on every submodule
        self.import_paths.insert(0, self.file_path.parent)
        if isinstance(extra_paths, str):
            extra_paths = extra_paths.split(";")
        for path in extra_paths:
            if isinstance(path, str):
                path = Path(path)
            self.import_paths.append(path.resolve())

    def __repr__(self) -> str:
        return f"Leswell js-module: {self.file_path.name}"

    def read_dependency_list(self):
        """Reads the module dependecy names and return them in a list
        Format: the file should start like this:
                imports = [...]"""
        # TODO: use regular expressions
        text = self.file_path.read_text().split("\n")
        import_str = ""
        is_import = False
        for linenum, line in enumerate(text):
            stripped = line.strip()
            # print(line, stripped)
            if stripped != "":
                space_splitted = stripped.split(" ")
                # print("splitted", space_splitted)
                if space_splitted[0] == "imports":
                    import_str += "".join(space_splitted[2:])
                    # print("got  import")
                    if import_str[-1] != "]":
                        is_import = True
                        # print("not]found")
                    else:
                        self.content_block = "\n".join(text[linenum+1:])
                elif is_import:
                    import_str += stripped
                    if import_str[-1] == "]":
                        self.content_block = "\n".join(text[linenum+1:])
                        break
                else:
                    self.content_block = "\n".join(text[linenum:])
                    break

        if import_str:
            # print(import_str)
            return loads(import_str)
        return []

    def check_dependency(self, dependency_path):
        """Check if a dependency with a certain path is in the imported dependencies"""
        return any(dependency.file_path == dependency_path for dependency in self.dependencies)

    def resolve_dependecies(self):
        """Searches for dependencies in the import_paths. 
        If a found dependency was not added, add it."""
        for dependency in self.dependency_names:
            for import_path in self.import_paths:
                dependency_path = (import_path / f"{dependency}.js")
                if dependency_path.exists():
                    if not self.check_dependency(dependency_path):
                        dependency_module = self.__class__(dependency_path)
                        self.dependencies.append(dependency_module)
                    break
            else:
                raise JsModuleNotFoundError(dependency)


    def render_final(self):
        """Returns the rendered content (as str)"""
        parts_list = []
        for dependency in self.dependencies:
            parts_list.append(dependency.content_block)
        parts_list.append(self.content_block)
        rendered_text = "\n".join(parts_list)
        return rendered_text


def main():
    argv = sys.argv[1:]
    cli_tool_name = "module.py"
    help_string = f'{cli_tool_name} inputfile <outputfolder>\n\
        -h: help\
        -o, ofile: output file\
        -p, extra-paths: adding custom search paths'
    inputfile = ''
    outputfile = ''
    outputfolder = ''
    extra_paths=[]
    print("\n")
    try:
        opts, args = getopt.getopt(argv,"ho:p:",["help", "ofile=", "extra-paths="])
    except getopt.GetoptError:
        print("syntax error")
        print("\t", help_string, "\n")
        sys.exit(2)
    for opt, arg in opts:
        if opt in ('-h', '--help'):
            print("help:")
            print("\t", help_string, "\n")
            sys.exit()
        elif opt in ("-p", "--extra-paths"):
            extra_paths = arg
        elif opt in ("-o", "--ofile"):
            outputfile = arg
    
    if args:
        inputfile = Path(args[0]).resolve()
        if len(args) > 1:
            outputfolder = args[1]
    else:
        print("input is needed!")
        print("\t", help_string, "\n")
        sys.exit(2)

    rendered_text = Module(inputfile, extra_paths=extra_paths).render_final()
    if not outputfile:
        if outputfolder:
            outputfile = Path(outputfolder).resolve() / inputfile.name
        else:
            print("output is needed!")
            print("\t", help_string, "\n")
            sys.exit(2)
    Path(outputfile).write_text(rendered_text)
    
    print("\n")
    


if __name__ == "__main__":
    main()
    # Module("./test/import_system/base.js").render_final()