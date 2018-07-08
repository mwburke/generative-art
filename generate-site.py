from os import listdir

POST_HEADER = 'page-components/post-header.html'
HEADER = 'page-components/header.html'
FOOTER = 'page-components/footer.html'
LEFT_ARROW = '<i class="fas fa-arrow-left"></i>'
RIGHT_ARROW = '<i class="fas fa-arrow-right"></i>'
PAGE_POST_COUNT = 5

def generate_site():
    post_header = open(POST_HEADER).read()
    header = open(HEADER).read()
    footer = open(FOOTER).read()
    posts = get_post_list().sort(reverse=True)
    generate_post_pages(posts, post_header, footer)
    generate_index_pages(posts, header, footer)

def get_post_list():
    return listdir('js/posts-js')

def generate_post_pages(posts, header, footer):
    for post in posts:
        generate_post_page(post, header, footer)

def generate_post_page(post, header, footer):
    file_name = 'posts/' + post.replace('js', 'html')

    with open(file_name, 'w') as f:
        f.write(header)
        f.write(post_script(post))
        f.write(post_div(post))
        f.write(footer)

def generate_index_pages(posts, header, footer):
    has_previous = False
    has_next = False
    i = 0
    
    while i < len(posts):
        page_posts = posts[i:max(len(posts) - 1, i + PAGE_POST_COUNT)]
        has_previous = i > 0
        has_next = (i + PAGE_POST_COUNT) <= (len(posts) - 1)

        generate_index_page(has_previous, has_next, i / PAGE_POST_COUNT + 1, page_posts, header, footer)

        i += PAGE_POST_COUNT

def generate_index_page(has_previous, has_next, page_num, page_posts, header, footer):
    file_name = 'posts/' + str(page_num) + '.html'
    if ~has_previous:
        file_name = 'index.html'

    with open(file_name, 'w') as f:
        f.write(header)

        for post in page_posts:
            f.write(post_div(post, True))

        for post in page_posts:
            f.write(post_script(post, True))

        f.write('  <table id="arrows"><tbody>\n  <tr>\n')
        if has_previous | has_next:
            if has_previous:
                if page_num == 2:
                    f.write('      <td><a href="index.html">' + LEFT_ARROW + '</a></td>')
                else:
                    f.write('      <td><a href="' + str(page_num - 1) + '.html">' + LEFT_ARROW + '</a></td>')

            if has_next:
                f.write('    <td><a href="' + str(page_num + 1) + '.html">' + RIGHT_ARROW + '</a></td>')

        f.write('\n    </tr>\n  </tbody></table>')
        f.write(footer)

def post_script(post, index=False):
    html = ''
    if index:
        html += '    <script src="js/posts-js/' + str(post) + '"></script>\n'
    else: 
        html += '    <script src="../js/posts-js/' + str(post) + '"></script>\n'
    return html

def post_div(post, index=False):
    html = ''
    if index:
        html += '<a href="' + 'posts/' + post.replace('js', 'html') + '">'
    html += '\n    <div class="viz" id="viz' + post.replace('.js', '') + '"></div>\n'
    if index:
        html += '</a>'
    
    return html

def add_arrows():
    pass


if __name__ == '__main__':
    generate_site()
