<template>
  <ul class="o-category-skills-list">
    <li
      :title="getTranslatedField(skillWithEvents.name)"
      class="o-category-skills-list__item o-category-skills-list__item--bold"
    >
      <o-typography class="o-category-skills-list__label">
        {{ getTranslatedField(skillWithEvents.name) }}
      </o-typography>
    </li>
    <li
      v-for="children in showSkills"
      :key="children.id"
      class="o-category-skills-list__item"
    >
      <router-link
        :to="localePath(getPathToCurrentSkill(children.slug))"
        :title="getTranslatedField(children.name)"
        class="o-category-skills-list__link"
      >
        <o-typography class="o-category-skills-list__label">{{ getTranslatedField(children.name) }}</o-typography>
      </router-link>
    </li>
    <li
      v-if="showAction"
      class="o-category-skills-list__item o-category-skills-list__item--accent o-category-skills-list__action"
      :title="toggleLabel"
      @click="showToggle"
    >
      <o-typography class="o-category-skills-list__label">{{ toggleLabel }}</o-typography>
    </li>
  </ul>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import ROUTES from '~/src/constants/routes';
import { getTranslatedField } from '~/src/utils';
import { Skill, SkillWithEvents } from '~/src/common/models';
import OTypography from '~/src/components/OTypography/OTypography.vue';

// @vue/component
@Component({
  name: 'o-category-skills-list',
  components: { OTypography }
})
export default class OCategorySkillsList extends Vue {
  @Prop({ type: Object, default: null }) skillWithEvents!: SkillWithEvents;

  @Prop({ type: String, default: '' }) categorySlug!: string;

  ROUTES = ROUTES;

  NUMBER_SHOWED_SKILLS = 5;

  getTranslatedField = getTranslatedField;

  showMore = false;

  get showSkills(): Skill[] {
    return this.skillWithEvents && !this.showMore
      ? this.skillWithEvents.children_with_events.slice(0, this.NUMBER_SHOWED_SKILLS)
      : this.skillWithEvents.children_with_events;
  }

  get showAction(): boolean {
    const totalSkillsNum = this.skillWithEvents.children_with_events.length;

    return totalSkillsNum > this.NUMBER_SHOWED_SKILLS;
  }

  get toggleLabel(): string {
    return this.showMore
      ? this.$t('components.turn') as string
      : this.$t('components.expand') as string;
  }

  getPathToCurrentSkill(slug: string): string {
    return `${ROUTES.LEARNING.INDEX}/${this.categorySlug}/${slug}`;
  }

  showToggle(): void {
    this.showMore = !this.showMore;
  }
}
</script>

<style lang="scss" scoped>
.o-category-skills-list {
  $self: &;

  &__item {
    @include paragraph-16-400;

    &:not(:first-child) {
      margin-top: 15px;
    }

    @include screen('md') {
      @include paragraph-14-400-dense;
    }

    &--bold {
      @include title-heading3;

      @include screen('md') {
        @include title-heading5;
      }
    }

    &--accent {
      @include paragraph-16-700-dense;
      color: $ohisColorPrimary;
      text-transform: lowercase;

      @include screen('md') {
        @include paragraph-14-700-dense;
      }
    }
  }

  &__link {
    color: #000;
    white-space: normal;
    cursor: pointer;

    @include screen('md') {
      &:hover {
        #{$self}__label {
          text-decoration: underline;
        }
      }
    }
  }

  &__label {
    @include ellipsis-row;
  }

  &__action {
    cursor: pointer;
  }
}
</style>
