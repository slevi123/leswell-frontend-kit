from jinja2.ext import Extension
from jinja2_simple_tags import StandaloneTag


class FaviconTag(StandaloneTag):
    tags={"favicon"}

    def render(self, url):
        return f'<link rel="icon" type="image/x-icon" href="{url}" />'
        
class CssTag(StandaloneTag):
    tags={"css"}

    def render(self, url):
        return f'<link rel="stylesheet" href="{url}">'

class UrlTag(StandaloneTag):
    tags={"css"}

    def render(self):
        return 


