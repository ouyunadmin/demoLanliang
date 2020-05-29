<template>
  <admin-container>
    <template slot="header">{{ $t('pub.pageHeader.demo') }}</template>
    <DemoI18nControl />
    <DemoI18n />
  </admin-container>
</template>

<script>
export default {
  name: 'LangDemo',
  components: {
    DemoI18nControl: () => import('./components/DemoI18nControl'),
    DemoI18n: () => import('./components/DemoI18n')
  }
}
</script>
