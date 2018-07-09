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
    posts = get_post_list()
    generate_post_pages(posts, post_header, footer)
    if len(posts) < 2:
        posts.append(None)
    generate_index_page(posts[0], posts[1], header, footer)

def get_post_list():
    posts = listdir('js/posts-js')
    posts.sort(reverse=True)
    return posts

def generate_post_pages(posts, header, footer):
    for i, post in enumerate(posts):
        if i > 0:
            prev_post = posts[i - 1]
        else:
            prev_post = None

        if  (i + 1) < len(posts):
            next_post = posts[i + 1]
        else:
            next_post = None

        generate_post_page(post, prev_post, next_post, header, footer)

def generate_post_page(post, prev_post, next_post, header, footer):
    file_name = 'posts/' + post.replace('js', 'html')

    with open(file_name, 'w') as f:
        f.write(header)
        f.write(post_script(post))
        f.write(post_div(post))

        if (prev_post is not None) | (next_post is not None):
            f.write('  <table id="arrows"><tbody>\n  <tr>\n')
            if prev_post is not None:
                f.write('      <td><a id="leftarrow" href="' + prev_post.replace('js', 'html') + '">' + LEFT_ARROW + '</a></td>')

            if next_post is not None:
                 f.write('      <td><a id="rightarrow" href="' + next_post.replace('js', 'html') + '">' + RIGHT_ARROW + '</a></td>')
            f.write('\n    </tr>\n  </tbody></table>')
            f.write(footer)


def generate_index_page(post, next_post, header, footer):

    with open('index.html', 'w') as f:
        f.write(header)
        f.write(post_div(post, True))
        f.write(post_script(post, True))

        if next_post is not None:
            f.write('  <table id="arrows"></tbody>\n  <tr>\n')
            f.write('    <td><a id="rightarrow" href="posts/' + next_post.replace('js', 'html') + '">' + RIGHT_ARROW + '</a></td>')

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
        html += '  <a href="' + 'posts/' + post.replace('js', 'html') + '">'
    html += '\n    <div class="viz" id="viz' + post.replace('.js', '') + '"></div>'
    if index:
        html += '\n  </a>'
    html += '\n'
    return html

if __name__ == '__main__':
    generate_site()
