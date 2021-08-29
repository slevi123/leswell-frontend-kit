import sys
from pathlib import Path
sys.path.append(str(Path("..\leswell-frontend-kit").resolve()))
from jinja2 import Environment, FileSystemLoader, select_autoescape
# print(sys.path)
from jinja_extensions.base_template import FaviconTag

env = Environment(
        loader=FileSystemLoader("./test/templates"),
        autoescape=select_autoescape(),
        extensions=[FaviconTag]
    )


def process(file_name, context={}, template_path=None):
    template_path = file_name

    site = env.get_template(template_path).render(**context)
    (Path(f"./test/rendered")/file_name).write_text(site, encoding='utf-8')    # sites

# site = env.get_template("base.html").render()
process("base.html")
