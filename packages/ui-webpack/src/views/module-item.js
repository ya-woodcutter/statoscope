import style from './badge-margin-fix.css';

export default function (discovery) {
  discovery.view.define('module-item', render);

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
          when: 'module.resolvedResource.fileType()',
          data: `
          $moduleResource:module.resolvedResource;
          {
            text: $moduleResource.fileExt(),
            color: $moduleResource.fileType().color(),
            hint: $moduleResource.fileType()
          }`,
        },
        {
          view: 'link',
          data: `{
            href: (module.id or module.identifier).pageLink("module", {hash:hash or #.params.hash}),
            text: module.resolvedResource or module.name or module.id,
            match: match
          }`,
          content: 'text-match',
        },
        {
          view: 'badge',
          data: `{text: module.moduleSize().formatSize()}`,
          when: showSize && data.module.size,
        },
        {
          view: 'badge',
          data: `{
            text: "+" + module.modules.size().pluralWithValue(['module', 'modules']),
            color: 40.colorFromH()
          }`,
          when: 'module.modules',
        },
        {
          view: 'badge',
          when: 'module.optimizationBailout',
          data: `{
            text: module.optimizationBailout.size().pluralWithValue(['deopt', 'deopts']),
            color: 0.colorFromH(),
            hint: module.optimizationBailout
          }`,
        },
      ],
      data,
      context
    );
  }
}
