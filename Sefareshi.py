from pywebio.input import *
from pywebio.output import *
from pywebio.pin import *
from pywebio.session import *
from pywebio.platform import *
import requests


def selected_theme(theme_change):

    with put_loading(scope="loading").style("width: 20px; height: 20px; margin-left: 5px;"):

        if pin.theme_select == "دفترچه":


            daftarche_html_url = requests.get("https://raw.githubusercontent.com/pikhosh/Daftarche/main/index.html")
            daftarche_css_url = requests.get("https://raw.githubusercontent.com/pikhosh/Daftarche/main/style.css")
            global daftarche_html_content
            daftarche_html_content = daftarche_html_url.text
            global daftarche_css_content 
            daftarche_css_content = daftarche_css_url.text

            global og_html_font_code
            og_html_font_code = """<link href="https://cdn.jsdelivr.net/gh/rastikerdar/sahel-font@v3.4.0/dist/font-face.css" rel="stylesheet" type="text/css">"""
            global og_css_font_code
            og_css_font_code = """@font-face {
    font-family: Sahel;
    src: url('Sahel.eot');
    src: url('Sahel.eot?#iefix') format('embedded-opentype'), url('Sahel.woff2') format('woff2'), url('Sahel.woff') format('woff'), url('Sahel.ttf') format('truetype');
    font-weight: normal;
}

@font-face {
    font-family: Sahel;
    src: url('Sahel-Bold.eot');
    src: url('Sahel-Bold.eot?#iefix') format('embedded-opentype'), url('Sahel-Bold.woff2') format('woff2'), url('Sahel-Bold.woff') format('woff'), url('Sahel-Bold.ttf') format('truetype');
    font-weight: bold;
}

@font-face {
    font-family: Sahel;
    src: url('Sahel-Light.eot');
    src: url('Sahel-Light.eot?#iefix') format('embedded-opentype'), url('Sahel-Light.woff2') format('woff2'), url('Sahel-Light.woff') format('woff'), url('Sahel-Light.ttf') format('truetype');
    font-weight: 300;
}

@font-face {
    font-family: Sahel;
    src: url('Sahel-SemiBold.eot');
    src: url('Sahel-SemiBold.eot?#iefix') format('embedded-opentype'), url('Sahel-SemiBold.woff2') format('woff2'), url('Sahel-SemiBold.woff') format('woff'), url('Sahel-SemiBold.ttf') format('truetype');
    font-weight: 600;
}

@font-face {
    font-family: Sahel;
    src: url('Sahel-Black.eot');
    src: url('Sahel-Black.eot?#iefix') format('embedded-opentype'), url('Sahel-Black.woff2') format('woff2'), url('Sahel-Black.woff') format('woff'), url('Sahel-Black.ttf') format('truetype');
    font-weight: 900;
}

@font-face {
    font-family: Vazir Code;
    src: url('Vazir-Code.eot');
    src: url('Vazir-Code.eot?#iefix') format('embedded-opentype'), url('Vazir-Code.woff') format('woff'), url('Vazir-Code.ttf') format('truetype');
    font-weight: normal;
}

@font-face {
    font-family: Vazir Code Hack;
    src: url('Vazir-Code-Hack.eot');
    src: url('Vazir-Code-Hack.eot?#iefix') format('embedded-opentype'), url('Vazir-Code-Hack.woff') format('woff'), url('Vazir-Code-Hack.ttf') format('truetype');
    font-weight: normal;
}

pre,
code {
    font-family: 'Vazir Code', 'Vazir Code Hack', monospaced;
}

:root {
    --Font: Sahel"""

            global og_css_light_bg
            og_css_light_bg = """MainBGColor: #FFF2E4"""
            global og_css_dark_bg
            og_css_dark_bg = """MainBGColor: #4D4944"""

            global og_html_list_img_code
            og_html_list_img_code = """<check:if post_image>
                                <div class="thumbnail">

                                    <img src="(*post_image*)">


                                </div>
                            </check:if>"""
            global og_html_post_img_code
            og_html_post_img_code = """<check:if post_image>
                            <div class="thumbnail">

                                <img src="(*post_image*)">


                            </div>
                        </check:if>"""


            global og_html_script_code
            og_html_script_code = """(*copyright_notice*) | طراح: <a href="https://pikhosh.blog.ir" target="blank" title="وبلاگ طراح قالب">پیخوش</a>

    </div>"""


            global og_css_dark_mode_code
            og_css_dark_mode_code = """@media (prefers-color-scheme: dark) {
     :root {
        --MainBGColor: #4d4944;
        --MainBoxColor: #4D4A4A;
        --SideBarColor: #4D4944;
        --PostBoxColor: #4D4D4D;
        --TextColor: #ffffffde;
        --MainBoxShadowColor: #00000080;
        --PaginationBGColor: #4D4D4D;
        --SideBarTitleShodow: inset 0 3px 6px -5px #00000080;
        --CommentBGColor: #4D4D4D;
        --CommentFormBGColor: #4D4D4D;
        --SelectedBGColor: #48433d;
        --CommentFormFocusOutlineColor: #606060;
    }
    .prettyprint>span {
        filter: invert(1);
    }
    .search-box.dark .submit,
    .search-box.dark .submit:hover,
    .search-box.dark .submit:focus {
        background-color: unset;
    }
    .comment-form input {
        color: var(--TextColor);
    }
    .search-box.dark {
        border: unset;
        background: unset;
    }
    .search-box.dark ::placeholder {
        color: var(--TextColor);
    }
    .search-box .submit {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='18' height='18'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z' fill='rgba(255,255,255,0.8705882352941177)'/%3E%3C/svg%3E");
    }
}"""


            global og_html_dark_mode_icon
            og_html_dark_mode_icon = """<a href="(*blog_link*)">(*blog_title*)</a> . <span id="description">(*blog_short_description*)</span>
        </h1>"""


            global og_html_read_time_code
            og_html_read_time_code = """<div class="post-page">



                    <div class="post-page-content-section">


                        <check:if post_image>
                                <div class="thumbnail">

                                    <img src="(*post_image*)">


                                </div>
                            </check:if>

                        <div class="other-than-image">
                            <div class="post-icon">

                                <i class="ri-file-text-line"></i>
                            </div>



                            <div class="other-than-icon">





                                <div class="iconandtitle">

                                    <h1> <a href="(*post_link*)">(*post_title*)</a> </h1>
                                </div>


                                <div class="detail">"""


            global og_html_footer_code
            og_html_footer_code = """(*copyright_notice*) | طراح: <a href="https://pikhosh.blog.ir" target="blank" title="وبلاگ طراح قالب">پیخوش</a>"""


            pin_update(name="font_select", value="ساحل")
            pin_update(name="light_bg", value="#FFF2E4")
            pin_update(name="dark_bg", value="#4D4944")
            pin_update(name="other_feature", value="قابلیت نمایش تصاویر اصلی مطالب؟")

            with use_scope("theme_preview", clear=True):
                put_row([

                    put_image(src="https://user-images.githubusercontent.com/73311467/154791394-ade77cf7-81c1-4103-95ae-3aa3922062d4.png", title="قالب دفترچه حالت روشن").style("border-radius: 10px"), None,
                    put_image(src="https://user-images.githubusercontent.com/73311467/154791399-ff89d206-149f-47c4-b868-02425ddcd28b.png", title="قالب دفترچه حالت تاریک").style("border-radius: 10px")
                
                ])
            
            

        elif pin.theme_select == "افکار":


            afkar_html_url = requests.get("https://raw.githubusercontent.com/pikhosh/Afkar/main/index.html")
            afkar_css_url = requests.get("https://raw.githubusercontent.com/pikhosh/Afkar/main/style.css")
            global afkar_html_content
            afkar_html_content = afkar_html_url.text
            global afkar_css_content
            afkar_css_content = afkar_css_url.text

            og_html_font_code = """<style>
            @import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        </style>"""
            og_css_font_code = """@font-face {
    font-family: Behdad;
    src: url(https://bayanbox.ir/download/521927549352849432/Behdad-Regular.ttf), url(https://bayanbox.ir/download/2566563334380828087/Behdad-Regular.otf), url(https://bayanbox.ir/download/8447146387304990502/Behdad-Regular.woff), url(https://bayanbox.ir/download/7309035304661827246/Behdad-Regular.woff2);
    font-weight: normal;
}

@font-face {
    font-family: Vazir Code;
    src: url('Vazir-Code.eot');
    src: url('Vazir-Code.eot?#iefix') format('embedded-opentype'), url('Vazir-Code.woff') format('woff'), url('Vazir-Code.ttf') format('truetype');
    font-weight: normal;
}

@font-face {
    font-family: Vazir Code Hack;
    src: url('Vazir-Code-Hack.eot');
    src: url('Vazir-Code-Hack.eot?#iefix') format('embedded-opentype'), url('Vazir-Code-Hack.woff') format('woff'), url('Vazir-Code-Hack.ttf') format('truetype');
    font-weight: normal;
}

pre,
code {
    font-family: 'Vazir Code', 'Vazir Code Hack', monospaced;
}

:root {
    --Font: Behdad, 'Rubik'"""

            og_css_light_bg = """BackgroundColor: white"""
            og_css_dark_bg = """BackgroundColor: #252525"""

            og_html_post_img_code = """<h1>(*post_title*)</h1>
            <div id="post-detail">"""


            og_html_script_code = """(*copyright_notice*) | طراح: <a href="https://pikhosh.blog.ir" target="blank" title="وبلاگ طراح قالب">پیخوش</a> (الهام گرفته از: <a href="https://github.com/joway/hugo-theme-yinyang" target="_blank" title="منبع طراحی">YinYang)</a>
    </div>"""


            og_css_dark_mode_code = """@media (prefers-color-scheme: dark) {
    body {
        background-color: var(--BackgroundColor);
        color: var(--FontColor);
    }
     :root {
        --BorderColor: white;
        --FontColor: #ffffffde;
        --BackgroundColor: #252525;
    }
    .prettyprint>span {
        filter: invert(1);
    }
}"""


            og_html_dark_mode_icon = """<h1><a href="(*blog_link*)">(*blog_title*)</a></h1>"""



            og_html_read_time_code = """<div id="post-detail">
                <h3>(*post_date format="%d %B %y"*)</h3>"""




            og_html_footer_code = """(*copyright_notice*) | طراح: <a href="https://pikhosh.blog.ir" target="blank" title="وبلاگ طراح قالب">پیخوش</a> (الهام گرفته از: <a href="https://github.com/joway/hugo-theme-yinyang" target="_blank" title="منبع طراحی">YinYang)</a>"""



            pin_update(name="font_select", value="بهداد")
            pin_update(name="light_bg", value="#ffffff")
            pin_update(name="dark_bg", value="#252525")
            pin_update(name="other_feature", value="")

            with use_scope("theme_preview", clear=True):
                put_row([
                    put_image(src="https://user-images.githubusercontent.com/73311467/154895089-638b539a-a912-4924-b7e6-989eb0e506f9.png", title="قالب افکار حالت روشن").style("border-radius: 10px"), None,
                    put_image(src="https://user-images.githubusercontent.com/73311467/154895116-13b86329-68b7-479e-a3a4-5404b17a5585.png", title="قالب افکار حالت تاریک").style("border-radius: 10px")
        


                ])
                
        

        selected_font_preview(True)

        global html_script_code
        html_script_code = og_html_script_code

        global html_dark_mode_icon
        html_dark_mode_icon = og_html_dark_mode_icon

        global css_dark_mode_code
        css_dark_mode_code = og_css_dark_mode_code
        
        global html_read_time_code
        html_read_time_code = og_html_read_time_code



def selected_font():
    
    if pin.font_select == "ساحل":
        global html_font_code
        html_font_code = """<link href="https://cdn.jsdelivr.net/gh/rastikerdar/sahel-font@v3.4.0/dist/font-face.css" rel="stylesheet" type="text/css">"""
        global css_font_code
        css_font_code = """@font-face {
    font-family: Sahel;
    src: url('Sahel.eot');
    src: url('Sahel.eot?#iefix') format('embedded-opentype'), url('Sahel.woff2') format('woff2'), url('Sahel.woff') format('woff'), url('Sahel.ttf') format('truetype');
    font-weight: normal;
}

@font-face {
    font-family: Sahel;
    src: url('Sahel-Bold.eot');
    src: url('Sahel-Bold.eot?#iefix') format('embedded-opentype'), url('Sahel-Bold.woff2') format('woff2'), url('Sahel-Bold.woff') format('woff'), url('Sahel-Bold.ttf') format('truetype');
    font-weight: bold;
}

@font-face {
    font-family: Sahel;
    src: url('Sahel-Light.eot');
    src: url('Sahel-Light.eot?#iefix') format('embedded-opentype'), url('Sahel-Light.woff2') format('woff2'), url('Sahel-Light.woff') format('woff'), url('Sahel-Light.ttf') format('truetype');
    font-weight: 300;
}

@font-face {
    font-family: Sahel;
    src: url('Sahel-SemiBold.eot');
    src: url('Sahel-SemiBold.eot?#iefix') format('embedded-opentype'), url('Sahel-SemiBold.woff2') format('woff2'), url('Sahel-SemiBold.woff') format('woff'), url('Sahel-SemiBold.ttf') format('truetype');
    font-weight: 600;
}

@font-face {
    font-family: Sahel;
    src: url('Sahel-Black.eot');
    src: url('Sahel-Black.eot?#iefix') format('embedded-opentype'), url('Sahel-Black.woff2') format('woff2'), url('Sahel-Black.woff') format('woff'), url('Sahel-Black.ttf') format('truetype');
    font-weight: 900;
}

@font-face {
    font-family: Vazir Code;
    src: url('Vazir-Code.eot');
    src: url('Vazir-Code.eot?#iefix') format('embedded-opentype'), url('Vazir-Code.woff') format('woff'), url('Vazir-Code.ttf') format('truetype');
    font-weight: normal;
}

@font-face {
    font-family: Vazir Code Hack;
    src: url('Vazir-Code-Hack.eot');
    src: url('Vazir-Code-Hack.eot?#iefix') format('embedded-opentype'), url('Vazir-Code-Hack.woff') format('woff'), url('Vazir-Code-Hack.ttf') format('truetype');
    font-weight: normal;
}

pre,
code {
    font-family: 'Vazir Code', 'Vazir Code Hack', monospaced;
}

:root {
    --Font: Sahel"""
    elif pin.font_select == "بهداد":
        html_font_code = """"""
        css_font_code = """@font-face {
    font-family: Behdad;
    src: url(https://bayanbox.ir/download/521927549352849432/Behdad-Regular.ttf), url(https://bayanbox.ir/download/2566563334380828087/Behdad-Regular.otf), url(https://bayanbox.ir/download/8447146387304990502/Behdad-Regular.woff), url(https://bayanbox.ir/download/7309035304661827246/Behdad-Regular.woff2);
    font-weight: normal;
}

@font-face {
    font-family: Vazir Code;
    src: url('Vazir-Code.eot');
    src: url('Vazir-Code.eot?#iefix') format('embedded-opentype'), url('Vazir-Code.woff') format('woff'), url('Vazir-Code.ttf') format('truetype');
    font-weight: normal;
}

@font-face {
    font-family: Vazir Code Hack;
    src: url('Vazir-Code-Hack.eot');
    src: url('Vazir-Code-Hack.eot?#iefix') format('embedded-opentype'), url('Vazir-Code-Hack.woff') format('woff'), url('Vazir-Code-Hack.ttf') format('truetype');
    font-weight: normal;
}

pre,
code {
    font-family: 'Vazir Code', 'Vazir Code Hack', monospaced;
}

:root {
    --Font: Behdad, 'Rubik'"""



def selected_font_preview(selected_font_change):
    if pin.font_select == "ساحل":
        with use_scope("font_preview", clear=True):
            put_markdown("فونت ساحل قراره یه **همچین** شکل و شمایلی داشته باشه *دوست گرامی*!").style("font-family: Sahel")

    elif pin.font_select == "بهداد":
        with use_scope("font_preview", clear=True):
            put_markdown("فونت بهداد قراره یه **همچین** شکل و شمایلی داشته باشه *دوست گرامی*!").style("font-family: Behdad")



def selected_light_bg():
    if pin.theme_select == "دفترچه":
        global css_light_bg
        css_light_bg = """MainBGColor: """ + pin.light_bg
    elif pin.theme_select == "افکار":
        css_light_bg = """BackgroundColor: """ + pin.light_bg



def selected_dark_bg():
    if pin.theme_select == "دفترچه":
        global css_dark_bg
        css_dark_bg = """MainBGColor: """ + pin.dark_bg
    elif pin.theme_select == "افکار":
        css_dark_bg = """BackgroundColor: """ + pin.dark_bg



def selected_other_feature():

    if pin.theme_select == "دفترچه":
        if pin.other_feature == ['قابلیت نمایش تصاویر اصلی مطالب؟']:
            global html_img_code
            html_img_code = """<check:if post_image>
                                <div class="thumbnail">

                                    <img src="(*post_image*)">


                                </div>
                            </check:if>"""
        elif pin.other_feature != ['قابلیت نمایش تصاویر اصلی مطالب؟']:
            html_img_code = """"""
            
    elif pin.theme_select == "افکار":
        if pin.other_feature == ['قابلیت نمایش تصاویر اصلی مطالب؟']:
            html_img_code = """<h1>(*post_title*)</h1>
<check:if post_image>
    <div class="thumbnail">

        <img src="(*post_image*)">


    </div>
</check:if>
<div id="post-detail">"""
        elif pin.other_feature != ['قابلیت نمایش تصاویر اصلی مطالب؟']:
            html_img_code = """<h1>(*post_title*)</h1>
<div id="post-detail">"""
        


def selected_js(js_change):

    if pin.js_feature == ['امکان استفاده از جاوا اسکریپت رو روی وبلاگ تون فعال کردین؟']:
        with use_scope("js"):
            put_checkbox("js_feature_list", options=["اضافه کردن دکمه برای کنترل حالت رنگی",
            "اضافه کردن زمان مورد نیاز برای مطالعه مطالب"
                ])
            js_feature_list_change = pin_on_change("js_feature_list", onchange=selected_js_feature_list)
    elif pin.js_feature == []:
        with use_scope("js", clear=True):
            put_text("")



def selected_js_feature_list(js_feature_list_change):

    global html_script_code
    html_script_code = og_html_script_code

    
    if "اضافه کردن دکمه برای کنترل حالت رنگی" in pin.js_feature_list:

        
        html_script_code = html_script_code + """<script>
        function darkMode() {
            var darkModeCheckBox = document.querySelector("#dark-mode-button").checked
            var root = document.documentElement;
            var darkModeLabel = document.querySelector("#dark-mode-label")


            if (darkModeCheckBox) {
                localStorage.setItem("colormode", "dark");
                root.setAttribute("class", "dark-mode")
                darkModeLabel.innerHTML = `<i class="ri-lightbulb-line"></i>`
                darkModeLabel.title = ("title", "نه دیگه خیلی تاریکه؛ روشن کنین آقا!")

            } else {
                localStorage.setItem("colormode", "light");
                root.removeAttribute("class", "dark-mode")
                darkModeLabel.innerHTML = `<i class="ri-lightbulb-flash-line"></i>`
                darkModeLabel.title = ("title", "حالا خودمونیم... خاموش کنیم بهتر بود!")
            }


        }


        if (localStorage.getItem("colormode") == "dark") {
            document.querySelector("#dark-mode-button").checked = true
            darkMode()

        } else {
            document.querySelector("#dark-mode-button").checked = false
            darkMode()

        }
    </script>"""
        
        global html_dark_mode_icon 
        html_dark_mode_icon = og_html_dark_mode_icon + """<input type="checkbox" id="dark-mode-button" onclick="darkMode()">
        <label for="dark-mode-button" id="dark-mode-label" title="آقا برقا رو خاموش کنیم؟"><i class="ri-lightbulb-flash-line"></i></label>"""       
        

        if pin.theme_select == "دفترچه":
            global css_dark_mode_code
            css_dark_mode_code = """.prettyprint>span {
    filter: var(--PrettyFilter);
}
.search-box.dark .submit,
.search-box.dark .submit:hover,
.search-box.dark .submit:focus {
    background-color: var(--DarkModeUnset);
}
.comment-form input {
    color: var(--TextColor);
}
.search-box.dark {
    border: var(--DarkModeUnset);
    background: var(--DarkModeUnset);
}
.search-box.dark ::placeholder {
    color: var(--TextColor);
}
.search-box .submit {
    background-image: var(--SearchBGImage);
}

.dark-mode {
    --MainBGColor: #4D4944;
    --MainBoxColor: #4D4A4A;
    --SideBarColor: #4D4944;
    --PostBoxColor: #4D4D4D;
    --TextColor: #ffffffde;
    --MainBoxShadowColor: #00000080;
    --PaginationBGColor: #4D4D4D;
    --SideBarTitleShodow: inset 0 3px 6px -5px #00000080;
    --CommentBGColor: #4D4D4D;
    --CommentFormBGColor: #4D4D4D;
    --SelectedBGColor: #48433d;
    --CommentFormFocusOutlineColor: #606060;
    --PrettyFilter: invert(1);
    --SearchBGImage: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='18' height='18'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z' fill='rgba(255,255,255,0.8705882352941177)'/%3E%3C/svg%3E");
    --DarkModeUnset: unset;
}

#dark-mode-button {
    display: none;
}

#dark-mode-label {
    cursor: pointer;
    font-size: large;
    margin-right: 2px;
}"""
            
        elif pin.theme_select == "افکار":
            css_dark_mode_code = """body {
    background-color: var(--BackgroundColor);
    color: var(--FontColor);
}


.prettyprint>span {
    filter: var(--PrettyFilter);
}


.dark-mode {
    --PrettyFilter: invert(1);
    --BorderColor: white;
    --FontColor: #ffffffde;
    --BackgroundColor: #252525;
}

#dark-mode-button {
    display: none;
}

#dark-mode-label {
    cursor: pointer;
    font-size: large;
    margin-right: 2px;
}"""
    

    else:
        

        html_dark_mode_icon = og_html_dark_mode_icon

        css_dark_mode_code = og_css_dark_mode_code
        
        

    if "اضافه کردن زمان مورد نیاز برای مطالعه مطالب" in pin.js_feature_list:

        html_script_code = html_script_code + """<script>
        var postContent = document.querySelector(".text-content").innerText
        var readTimeText = document.querySelector("#read-time")
        var contentWordCount = postContent.split(" ").length
        const wordsPerMinute = 200
        var readTime = Math.round(contentWordCount / wordsPerMinute).toLocaleString("fa-IR")

        if (readTime == "۰") {
            console.log("یه دیقه و کمتر")
            console.log(readTime)
            console.log(contentWordCount)
            readTimeText.innerText = "کمتر از یک دقیقه"

        } else {
            console.log(readTime)
            console.log(contentWordCount)
            readTimeText.innerText = readTime + " دقیقه"
        }
    </script>"""
        

        if pin.theme_select == "دفترچه":
            
            global html_read_time_code 
            html_read_time_code = og_html_read_time_code + """<span id="read-time-text">زمان مطالعه: </span>
                                    <span id="read-time">نامشخص</span> | """  
            

        elif pin.theme_select == "افکار":

            html_read_time_code = og_html_read_time_code + """<h3 id="read-time-text">زمان مطالعه: <span id="read-time">نامشخص</span></h3>"""
        
    else:
        
        html_read_time_code = og_html_read_time_code   


    if bool(pin.js_feature_list) == False:
        html_script_code = og_html_script_code



def generate():
    
    html_footer_code = og_html_footer_code + """ | <a href="https://sefareshi.herokuapp.com" target="_blank" title="ساخته شده با ابزار سفارشی!">سفارشی!</a>"""

    selected_font()
    selected_light_bg()
    selected_dark_bg()
    selected_other_feature()


    
    if pin.theme_select == "دفترچه":
        global final_html_code
        final_html_code = daftarche_html_content.replace(og_html_font_code, html_font_code).replace(og_html_list_img_code, html_img_code).replace(og_html_post_img_code, html_img_code).replace(og_html_script_code, html_script_code).replace(og_html_dark_mode_icon, html_dark_mode_icon).replace(og_html_read_time_code, html_read_time_code).replace(og_html_footer_code, html_footer_code)
        global final_css_code
        final_css_code = daftarche_css_content.replace(og_css_font_code, css_font_code).replace(og_css_light_bg, css_light_bg).replace(og_css_dark_bg, css_dark_bg).replace(og_css_dark_mode_code, css_dark_mode_code)


    elif pin.theme_select == "افکار":
        final_html_code = afkar_html_content.replace(og_html_font_code, html_font_code).replace(og_html_post_img_code, html_img_code).replace(og_html_script_code, html_script_code).replace(og_html_dark_mode_icon, html_dark_mode_icon).replace(og_html_read_time_code, html_read_time_code).replace(og_html_footer_code, html_footer_code)
        final_css_code = afkar_css_content.replace(og_css_font_code, css_font_code).replace(og_css_light_bg, css_light_bg).replace(og_css_dark_bg, css_dark_bg).replace(og_css_dark_mode_code, css_dark_mode_code)
        


    with use_scope("output", clear=True):
        put_markdown("# 👨‍🍳 کد شما حاضره:")
        put_markdown("کد ساختار قالب")
        put_code(final_html_code, 'html', rows=12)
        put_button("کپی کن!", onclick=copy_html, color="info")

        put_markdown("کد CSS قالب")
        put_code(final_css_code, 'css', rows=12)
        put_button("کپی کن!", onclick=copy_css, color="info")
 
    

def copy_html():
    run_js('navigator.clipboard.writeText(FHC)', FHC=final_html_code)
    toast("حله کپی شد :) برو عشق کن")



def copy_css():
    run_js('navigator.clipboard.writeText(FCC)', FCC=final_css_code)
    toast("کپی شد! اینم از کد CSS :)")



def main():


    
    image_url="https://bayanbox.ir/download/4316709884354097472/Sefareshi-Favicon.png"
    run_js("""
    $('#favicon32,#favicon16').remove(); 
    $('head').append('<link rel="icon" type="image/png" href="%s">')
    """ % image_url)


  
    put_row([

    put_scope("loading"),
    put_markdown("## 🧐 قالب مورد نظرت رو انتخاب کن")
    


    ], size="max-content").style("align-items: center")
    
        
    put_radio("theme_select", options=["دفترچه", "افکار"])
    theme_change = pin_on_change(name="theme_select", onchange=selected_theme)
    put_scope(name="theme_preview")
    
    put_markdown("## کدوم فونت؟")
    put_radio("font_select", options=["ساحل", "بهداد"])
    selected_font_change = pin_on_change(name="font_select", onchange=selected_font_preview)
    put_scope(name="font_preview")
   


    put_markdown("## کدوم رنگ پس زمینه؟")

    put_markdown("برای حالت روشن:")
    put_input("light_bg", type="color")


    put_markdown("برای حالت تاریک:")
    put_input("dark_bg", type="color")


    put_markdown("## ویژگی های دیگه")
    put_checkbox("other_feature", options=["قابلیت نمایش تصاویر اصلی مطالب؟"])


    put_markdown("## جاوا اسکریپت")
    put_checkbox("js_feature", options=["امکان استفاده از جاوا اسکریپت رو روی وبلاگ تون فعال کردین؟"])
    js_change = pin_on_change(name="js_feature", onchange=selected_js)

    put_scope("js")


    put_button("سفارشی کن! 🗿", onclick=generate, color="primary")

    put_scope("output")



config(title="سفارشی!", theme="sketchy", description="قالب هارو اونطوری که می خوای سفارشی کن!", css_style="""@import url('https://v1.fontapi.ir/css/MikhakFD:100;200;300;400;500;600;700;800;900');

@import url('https://v1.fontapi.ir/css/Sahel:300;400;600;700;900');


@font-face {
    font-family: Behdad;
    src: url(https://bayanbox.ir/download/521927549352849432/Behdad-Regular.ttf), url(https://bayanbox.ir/download/2566563334380828087/Behdad-Regular.otf), url(https://bayanbox.ir/download/8447146387304990502/Behdad-Regular.woff), url(https://bayanbox.ir/download/7309035304661827246/Behdad-Regular.woff2);
    font-weight: normal;
}


body {
    text-align: right;
}

body, .h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6, button, input, optgroup, select, textarea, code[class*=language-], pre[class*=language-] {
    font-family: 'Mikhak FD', sans-serif;
    font-weight: normal;


}

html {
    direction: rtl;
}

.form-check-input {
    margin-right: -1.25rem;
    margin-left: 0;

}

[type=checkbox]::before {
  
    right: -1.2em;
    left: 0;
}

.form-check-label {
    padding-right: 2.5rem;
    padding-left: 0;

}

.form-check {
  
    padding-right: 1.25rem;
    padding-left: 0;
}

[type=radio]::before {
  
    right: -1.2em;
    left: 0;
    
}


[type=checkbox]:checked::after {
 
    right: -0.75em;
    left: 0;
    top: -0.5em;
   
}

pre {
    text-align: left;
    direction: ltr;
}



""", js_code="""$('footer').html('<a href="https://instagram.com/pikhosh" target="_blank" title="صفحه اینستاگرام"><i class="ri-instagram-line"></i></a><a href="https://youtube.com/channel/UCky4IRq9d_XRdNuWcQCqD3g" target="_blank" title="کانال یوتیوب"><i class="ri-youtube-line"></i></a> (طراح: <a href="https://pikhosh.blog.ir" target="_blank" title="وبلاگ طراح قالب">پیخوش</a> | قدرت گرفته از <a href="https://www.pyweb.io/" target="_blank">PyWebIO</a>) <a href="https://github.com/pikhosh/Sefareshi" target="_blank" title="مخزن گیت هاب"><i class="ri-github-line"></i></a><a href="https://hamibash.com/pikhosh" target="_blank" title="دونیت"><i class="ri-money-dollar-circle-line"></i></a>'); """, css_file="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css")


if __name__ == '__main__':
    import argparse
    from pywebio.platform.tornado_http import start_server as start_http_server
    from pywebio import start_server as start_ws_server

    parser = argparse.ArgumentParser()
    parser.add_argument("-p", "--port", type=int, default=8080)
    parser.add_argument("--http", action="store_true", default=False, help='Whether to enable http protocol for communicates')
    args = parser.parse_args()

    if args.http:
        start_http_server(main, port=args.port)
    else:
        # Since some cloud server may close idle connections (such as heroku),
        # use `websocket_ping_interval` to  keep the connection alive
        start_ws_server(main, port=args.port, websocket_ping_interval=30)