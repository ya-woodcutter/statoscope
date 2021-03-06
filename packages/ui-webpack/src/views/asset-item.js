import style from './badge-margin-fix.css';

export default function (discovery) {
  discovery.view.define('asset-item', render);

  function render(el, config, data, context) {
    const { showSize = true, inline = false } = data;

    el.classList.add(style.root);

    if (inline) {
      el.classList.add('inline-block');
    }

    discovery.view.render(
      el,
      [
        {
          view: 'badge',
          when: 'asset.name.fileType()',
          data: `{
            text: asset.name.fileExt(),
            color: asset.name.fileType().color(),
            hint: asset.name.fileType()
          }`,
        },
        {
          view: 'link',
          data: `{
            href:asset.name.pageLink("asset", {hash:hash or #.params.hash}),
            text: asset.name,
            match: match
          }`,
          content: 'text-match',
        },
        {
          view: 'badge',
          data: `{
            text: asset.size.formatSize(),
            color: asset.isOverSizeLimit and 0.colorFromH(),
            hint: asset.isOverSizeLimit and "oversized"
          }`,
          when: showSize,
        },
      ],
      data,
      context
    );
  }
}
