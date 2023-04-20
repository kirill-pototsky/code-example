<template>
  <nav
    class="o-category"
    @mouseleave.stop="mouseLeave"
  >
    <header class="o-category__header o-category-header">
      <svg-icon
        v-if="arrowBack"
        class="o-category-header__back"
        name="west"
        :color="COLORS.ohisLight"
        width="20"
        height="25"
        fill-rule="event"
        @click.stop="close"
      />

      <o-typography
        variant="heading3"
        :title="$t('menu.catalog')"
        custom-classes="o-category-header__title"
      >
        {{ $t('menu.catalog') }}
      </o-typography>

      <svg-icon
        class="o-category-header__close"
        name="close"
        :color="COLORS.ohisLight"
        width="15"
        height="15"
        fill-rule="event"
        @click.stop="close"
      />
    </header>

    <OCategoryList
      :category-data="categoryData"
      :hover-item="selectedCategory"
      :class="[{'o-category__list--skills-is-opened': categoryHover}]"
      class="o-category__list"
      @category-hover="mouseOver"
    />

    <div
      v-if="categoryHover && selectedCategory"
      class="o-category__popup o-category-popup"
    >
      <header class="o-category-popup__header o-category-header">
        <svg-icon
          class="o-category-header__back"
          name="west"
          :color="COLORS.ohisLight"
          width="20"
          height="25"
          fill-rule="event"
          @click.stop="mouseLeave"
        />

        <o-typography
          variant="heading3"
          :title="getTranslatedField(selectedCategory.name)"
          custom-classes="o-category-header__title"
        >
          {{ getTranslatedField(selectedCategory.name) }}
        </o-typography>

        <router-link
          :to="localePath(`${ROUTES.LEARNING.INDEX}/${selectedCategory.slug}`)"
          class="o-category-header__link"
        >
          <o-typography
            :title="$t('main.watchAll')"
            class="o-category-header__label"
          >
            {{ $t('main.watchAll') }}
          </o-typography>
        </router-link>

        <router-link
          :to="localePath(`${ROUTES.LEARNING.INDEX}/${selectedCategory.slug}/?is_free=1`)"
          class="o-category-header__link"
        >
          <o-typography
            :title="$t('main.watchFree')"
            class="o-category-header__label"
          >
            {{ $t('main.watchFree') }}
          </o-typography>
        </router-link>

        <svg-icon
          class="o-category-header__close"
          name="close"
          :color="COLORS.ohisLight"
          width="15"
          height="15"
          fill-rule="event"
          @click.stop="close"
        />
      </header>
      <section class="o-category-popup__content">
        <o-category-skills-list
          v-for="skillWithEvents in selectedCategory.skills_with_events"
          :key="skillWithEvents.id"
          class="o-category__skill"
          :category-slug="selectedCategory.slug"
          :skill-with-events="skillWithEvents"
        />
      </section>
    </div>
  </nav>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';

import ROUTES from '~/src/constants/routes';
import COLORS from '~/src/assets/scss/variables/_colors.scss';

import { Category } from '~/src/common/models';
import OCategoryList from '~/src/complexComponents/OCategory/Components/OCategoryList.vue';
import OCategorySkillsList from '~/src/complexComponents/OCategory/Components/OCategorySkillsList.vue';
import { getTranslatedField } from '~/src/utils';
import OTypography from '~/src/components/OTypography/OTypography.vue';
// @vue/component
@Component({
  name: 'o-category',
  components: {
    OCategoryList,
    OCategorySkillsList,
    OTypography
  }
})
export default class OCategory extends Vue {
  @Prop({ type: Array, default: null }) categoryData!: Category[];

  @Prop({ type: Boolean, default: false }) isOpened!: boolean;

  @Prop({ type: Boolean, default: false }) arrowBack!: boolean;

  ROUTES = ROUTES;

  COLORS = COLORS;

  isOpen = this.isOpened;

  getTranslatedField = getTranslatedField;

  categoryHover = false;

  selectedCategory: Category | null = null;

  mouseOver(categoryHovered: Category): void {
    this.selectedCategory = categoryHovered;
    this.categoryHover = true;
  }

  mouseLeave(): void {
    this.selectedCategory = null;
    this.categoryHover = false;
  }

  @Watch('$route.path')
  closeCategory(): void {
    if (this.categoryHover) {
      this.mouseLeave();
    }
  }

  @Emit('close-category')
  close(): void {
    this.mouseLeave();
  }
 }
</script>

<style lang="scss" scoped>
.o-category-header {
  background-color: #fff;

  @include flex(flex-start);
  flex-wrap: wrap;

  @include screen('md') {
    flex-wrap: nowrap;
  }

  &__title {
    @include ellipsis;

    @include screen('md') {
      @include title-heading2;
    }
  }

  &__link {
    @include paragraph-16-700-dense;
    color: #000;

    width: 100%;
    order: 10;
    margin-top: 30px;

    flex-shrink: 0;

    &:last-of-type {
      margin-bottom: 30px;
    }

    @include screen('md') {
      @include paragraph-14-700-dense;
      color: $ohisColorPrimary;

      width: auto;
      margin: 0 10px;
      order: 0;

      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }

  &__back {
    margin-right: 10px;

    @include screen('md') {
      display: none;
    }
  }

  &__close {
    margin-left: auto;
    flex-shrink: 0;

    @include screen('md') {
      &:hover {
        cursor: pointer;
      }
    }
  }
}

.o-category-popup {
  padding: 15px;

  @include screen('md') {
    padding: 15px 32px;
  }

  &__header {
    width: 100%;

    @include screen('md') {
      border-bottom: 1px solid rgba(#98a2b3, 0.5);
      margin-bottom: 35px;
      padding-top: 15px;
      padding-bottom: 15px;
    }
  }

  &__content {
    width: 100%;

    @include screen('lg') {
      display: flex;
      flex-wrap: wrap;
      gap: 32px;
    }
  }
}

.o-category {
  position: relative;
  background-color: #fff;

  min-width: 320px;
  height: 100%;
  padding: 15px 15px 0;
  @include screen('md', max) {
    overflow-y: scroll;
  }

  box-shadow: inset 1px 0px 0px #E7EAF2;

  &__header {
    height: 72px;
    padding-top: var(--safe-area-inset-top);
    margin-bottom: 10px;

    @include screen('md') {
      display: none;
    }
  }

  &__list {
    position: relative;
    z-index: 499;

    margin-left: -15px;
    margin-right: -15px;
    background: $ohisWhiteColor;

    @include screen('md', max) {
      &--skills-is-opened {
        display: none;
      }
    }
  }

  &__popup {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;

    z-index: 500;

    min-width: 100%;
    min-height: 100%;

    background-color: #fff;
    box-shadow: inset 1px 0px 0px #E7EAF2;

    @include screen('md') {
      left: 100%;

      width: 100vw;
      max-width: 400px;
      height: 100vh;
      overflow-y: auto;
    }

    @include screen('lg') {
      max-width: 588px;
    }

    @include screen('xl') {
      max-width: 828px;
    }

    @include screen('xxl') {
      max-width: 980px;
    }

    @include screen('hd') {
      max-width: 1072px;
    }
  }

  &__skill {
    @include screen('lg', max) {
      &:not(:first-child) {
        margin-top: 36px;
      }
    }

    @include screen('lg') {
      width: calc(100% / 2 - 32px);
    }

    @include screen('xl') {
      width: calc(100% / 3 - 32px);
    }
  }
}
</style>
