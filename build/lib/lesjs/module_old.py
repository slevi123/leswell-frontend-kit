import json
from pathlib import Path
from json import loads

class Module:
    """One javascript file to render"""
    def __init__(self, file_path, extra_paths=[]) -> None:
        if isinstance(file_path, str):
            file_path = Path(file_path)
        self.file_path = file_path.resolve()

        # self.parents = []
        self.dependecies = self.read_dependency_list()
        self.higher_dependencies = []
        self.lower_dependencies = []

        self.import_paths = []
        self.resolve_import_paths(extra_paths)
        self.render_dependecies()
        self.render_final()

    def resolve_import_paths(self, extra_paths):
        self.import_paths.append(self.file_path.parent)
        if isinstance(extra_paths, str):
            extra_paths = extra_paths.split(";")
        for path in extra_paths:
            if isinstance(path, str):
                path = Path(path)
            self.extra_paths.append(path.resolve())
        self.import_paths.append(Path("../bultin_modules").resolve())

    def read_dependency_list(self):
        """Reads the module dependecy names and return them in a list"""
        # TODO: if rendered
        text = self.file_path.read_text().split("\n")
        import_str = ""
        is_import = False
        for line in text:
            stripped = line.strip()
            if stripped != "":
                space_splitted = stripped.split(" ")
                if space_splitted[0] == "import":
                    import_str += "".join(space_splitted[1:])
                    if import_str[-1] != "]":
                        is_import = True
                elif is_import:
                    import_str += stripped
                    if import_str[-1] != "]":
                        break
                else:
                    break

        if import_str:
            return loads(import_str)
        return []

    @property
    def imported_dependencies(self):
        return self.higher_dependencies + self.lower_dependencies

    def check_dependency(self, dependency_path):
        """Check if a dependency with a certain path is in the imported dependencies"""
        return any(dependency.file_path == dependency_path for dependency in self.imported_dependencies)

    def render_dependecies(self):
        for dependency in self.dependecies:
            for import_path in self.import_paths:
                dependency_path = (import_path / dependency)
                if dependency_path.exists():
                    if not self.check_dependency(dependency_path):
                        dependency_module = self.__class__(dependency_path)
                        self.higher_dependencies.append(dependency_module)
                        self.lower_dependencies.extend(dependency_module)
                    break
            else:
                raise ModuleNotFoundError(f'\n"{dependency}" can`t be found!\n')

        for dependency in self.higher_dependencies:
            self.lower_dependencies.extend()


    def render_final(self):
        print(list(dict.fromkeys(self.imported_dependencies)))

if __name__ == "__main__":
    Module("./test/import_system/base.js")