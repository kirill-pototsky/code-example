<template>
  <ul class="o-category-list">
    <li class="o-category-list__item o-category-list__item--bold">
      <router-link
        :to="localePath(ROUTES.LEARNING.INDEX)"
        :title="$t('main.watchAll')"
        class="o-category-list__link"
      >
        <o-typography class="o-category-list__label">{{ $t('main.watchAll') }}</o-typography>
      </router-link>
    </li>
    <li class="o-category-list__item o-category-list__item--bold">
      <router-link
        :to="localePath(ROUTES.LEARNING.INDEX) + '?is_free=1'"
        :title="$t('main.watchFree')"
        class="o-category-list__link"
      >
        <o-typography class="o-category-list__label">{{ $t('main.watchFree') }}</o-typography>
      </router-link>
    </li>
    <li
      v-for="category in categoryData"
      :key="category.id"
      class="o-category-list__item"
      @[currentEvent].prevent.stop="categoryHover(category)"
    >
      <component
        :is="isTablet() ? 'div' : 'router-link'"
        :to="localePath(`${ROUTES.LEARNING.INDEX}/${category.slug}`)"
        :title="getTranslatedField(category.name, true)"
        class="o-category-list__link"
      >
        <o-typography class="o-category-list__label">{{ getTranslatedField(category.name, true) }}</o-typography>

        <svg-icon
          class="o-category-list__arrow"
          name="arrow-right"
          :color="colorIconArrow(category)"
          width="15"
          height="15"
          fill-rule="event"
        />
      </component>
    </li>
  </ul>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import COLORS from '~/src/assets/scss/variables/_colors.scss';
import ROUTES from '~/src/constants/routes';
import { Category } from '~/src/common/models';
import { getTranslatedField } from '~/src/utils';
import { isTablet } from '~/src/utils/device-type';
import OTypography from '~/src/components/OTypography/OTypography.vue';

// @vue/component
@Component({
  name: 'o-category-list',
  components: { OTypography }
})
export default class OCategoryList extends Vue {
  @Prop({ type: Array, default: null }) categoryData!: Category[];

  @Prop({ type: Object, default: null }) hoverItem!: Category;

  ROUTES = ROUTES;

  getTranslatedField = getTranslatedField;

  isTablet = isTablet;

  get currentEvent(): string {
    return this.isTablet() ? 'click' : 'mouseover';
  }

  colorIconArrow(currentItem: Category): string {
    return currentItem?.id === this.hoverItem?.id ? COLORS.ohisColorPrimary : COLORS.ohisLight;
  }

  @Emit('category-hover') categoryHover(categoryHovered: Category) {
    return categoryHovered;
  }
}
</script>

<style lang="scss" scoped>
.o-category-list {
  $self: &;

  position: relative;
  overflow-y: auto;

  &__item {
    @include paragraph-16-400;

    @include screen('md') {
      @include paragraph-14-400-dense;
    }

    &--bold {
      @include paragraph-16-700-dense;

      @include screen('md') {
        @include paragraph-14-700-dense;
      }
    }
  }

  &__link {
    padding: 12px 20px 12px 16px;
    @include flex(space-between);
    color: #000;

    @include screen('md') {
      padding: 12px 20px 12px 24px;

      &:hover {
        cursor: pointer;
        background-color: $ohisSecondary;
      }
    }
  }

  &__arrow {
    flex-shrink: 0;
  }

  &__label {
    @include ellipsis;
  }
}
</style>
