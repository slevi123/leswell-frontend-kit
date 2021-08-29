

class JsModuleNotFoundError(ModuleNotFoundError):
    def __init__(self, dependency) -> None:
        message = f'"{dependency}.js" can`t be found!'
        super().__init__(message)