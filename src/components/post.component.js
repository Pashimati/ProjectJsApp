import { Component } from "../core/component";
import { apiService } from "../services/api.service";
import { TransformService } from "../services/transform.service";

export class PostComponent extends Component {
    constructor(id, {loader}) {
        super(id)
        this.loader = loader
    }
    async onShow() {
        this.loader.show()
        const fbData = await apiService.fetchPosts()
        const posts =  TransformService.fbObjectToArray(fbData)
        const html = posts.map(post => renderPost(post))
        this.loader.hide()
        this.$el.insertAdjacentHTML('afterbegin', html.join(' '))
    }

    onHide() {
        this.$el.innerHTML = ''
    }
}

function renderPost(post) {
    const tag = post.type === 'news'
        ? '<li class="tag tag-blue tag-rounded">Новость</li>'
        : '<li class="tag  tag-rounded">Заметка</li>'

    const button = '<button class="button-round button-small button-primary">Сохранить</button>'

    return `
    <div class="panel">
      <div class="panel-head">
        <p class="panel-title">${post.title}</p>
        <ul class="tags">
          ${tag}
        </ul>
      </div>
      <div class="panel-body">
        <p class="multi-line">${post.fulltext}</p>
      </div>
      <div class="panel-footer w-panel-footer">
        <small>${post.date}</small>
        ${button}
      </div>
    </div>
    `
}

