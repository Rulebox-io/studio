<script setup>
  import {AdjustmentsVerticalIcon} from "@heroicons/vue/20/solid"
  import {CubeIcon} from "@heroicons/vue/24/outline"

  const text1 = ref("A textbox with some text in it")
  const text2 = ref("")

  const options = [
    {id: 1, name: "option 1"},
    {id: 2, name: "option 2"},
    {id: 3, name: "option 3"},
    {id: 4, name: "option 4"},
    {id: 5, name: "option 5"},
    {id: 6, name: "option 6"},
  ]
  const selectedOption = ref(options[0])

  const menuItems = [
    {id: 1, name: "About Rulebox"},
    {id: 2, name: "Preferences"},
    {id: 3, name: "Save as..."},
    {id: 4, name: "Export everything"},
    {id: 5, name: "Close and forget"},
  ]

  const coupleDaysAgo = new Date()
  coupleDaysAgo.setDate(coupleDaysAgo.getDate() - 3)

  const revisions = [
    {
      revision: "6",
      date: new Date("2022-10-12"),
      status: "draft",
      name: "Edwin Groenendaal",
    },
    {
      revision: "5",
      date: new Date("2021-09-25"),
      status: "published",
      name: "James Wilson",
    },
  ]
</script>
<template>
  <div class="bg-desaturated-100 p-4 dark:bg-desaturated-900">
    <div class="grid grid-cols-2 gap-4">
      <CommonHeader1>Rulesets</CommonHeader1>
      <p class="font-medium text-gray-900 dark:text-white">
        Top level header, 20px medium
      </p>
      <CommonHeader2>Revisions</CommonHeader2>
      <p class="font-medium text-gray-900 dark:text-white">
        Section header, 16px bold
      </p>

      <div class="space-x-2">
        <CommonButton>Publish</CommonButton>
        <CommonButton :disabled="true">Publish</CommonButton>
      </div>

      <div class="font-medium text-gray-900 dark:text-white">
        Button, 14px medium
      </div>

      <div class="space-x-2">
        <CommonButton variant="secondary">Cancel</CommonButton>
        <CommonButton variant="secondary" :disabled="true">Cancel</CommonButton>
      </div>

      <div class="font-medium text-gray-900 dark:text-white">
        Secondary button
      </div>

      <div class="space-x-2">
        <CommonButton variant="lesser">Publish</CommonButton>
        <CommonButton variant="lesser" :disabled="true">Publish</CommonButton>
      </div>

      <div class="font-medium text-gray-900 dark:text-white">Lesser button</div>

      <div class="flex flex-col space-y-2">
        <CommonTextbox placeholder="Name" :model="text1" />
        <CommonTextbox
          class="mt-2"
          placeholder="Placeholder text"
          :model="text2" />
        <CommonTextbox
          class="mt-2"
          placeholder="Placeholder with icon"
          :model="text2">
          <CubeIcon class="h-5 w-5"></CubeIcon>
        </CommonTextbox>
      </div>

      <div class="font-medium text-gray-900 dark:text-white">Text input</div>

      <div class="flex">
        <CommonSelect :model="selectedOption" :options="options" />
      </div>

      <div class="font-medium text-gray-900 dark:text-white">Dropdown</div>

      <div class="flex items-center space-x-2">
        <CommonLinkBox :disabled="false">Load history</CommonLinkBox>
        <CommonLinkBox :disabled="true">Load history</CommonLinkBox>
      </div>

      <div class="font-medium text-gray-900 dark:text-white">
        Link-style button
      </div>

      <div class="flex items-center space-x-2">
        <CommonIconButton :disabled="false"
          ><AdjustmentsVerticalIcon class="h-5 w-5"></AdjustmentsVerticalIcon
        ></CommonIconButton>
        <CommonIconButton :disabled="true"
          ><AdjustmentsVerticalIcon class="h-5 w-5"></AdjustmentsVerticalIcon
        ></CommonIconButton>
      </div>

      <div class="font-medium text-gray-900 dark:text-white">Icon button</div>

      <div class="flex w-full">
        <CommonMenuButton class="ml-auto" :items="menuItems" />
      </div>

      <div class="font-medium text-gray-900 dark:text-white">Menu button</div>

      <div class="flex flex-col">
        <CommonDisclosure>
          <template #title>Expand / collapse</template>
          <div class="text-gray-900 dark:text-white">
            This content is only visible once you press the disclosure button.
          </div>
        </CommonDisclosure>
      </div>

      <div class="font-medium text-gray-900 dark:text-white">
        Expand/collapse widget (mobile)
      </div>

      <div class="space-x-2">
        <CommonAvatar name="Edwin Groenendaal"></CommonAvatar>
        <CommonAvatar name="Edwin Groenendaal" size="sm"></CommonAvatar>
        <CommonAvatar name="James Wilson"></CommonAvatar>
        <CommonAvatar name="James Wilson" size="sm"></CommonAvatar>
      </div>

      <div class="font-medium text-gray-900 dark:text-white">User avatar</div>

      <div class="items-align flex space-x-2">
        <AppRevisionLabel :revision="6"></AppRevisionLabel>
        <AppRevisionLabel :revision="6" status="published"></AppRevisionLabel>
      </div>

      <div class="font-medium text-gray-900 dark:text-white">
        Revision labels
      </div>

      <div class="flex flex-col items-start space-y-2">
        <AppTag>invoice</AppTag>
        <AppCopyableTag>invoice</AppCopyableTag>
      </div>

      <div class="font-medium text-gray-900 dark:text-white">
        Tag and copyable tag
      </div>

      <div class="items-align flex space-x-2">
        <AppLabel label-color="#6AFFE4">Test</AppLabel>
        <AppLabel label-color="#F4FF79">Dev</AppLabel>
      </div>

      <div class="font-medium text-gray-900 dark:text-white">labels</div>

      <div class="items-align flex space-x-2">
        <AppInteractiveLabel label-color="#6AFFE4">Test</AppInteractiveLabel>
        <AppInteractiveLabel label-color="#F4FF79">Dev</AppInteractiveLabel>
      </div>

      <div class="font-medium text-gray-900 dark:text-white">
        clickable labels
      </div>

      <div>
        <AppSummary
          what="entity"
          display="Invoice"
          description="An invoice object represents a single invoice, with multiple line items with name, amount and price"
          tag="invoice"
          :labels="['Dev', 'Test']"></AppSummary>
      </div>

      <div class="font-medium text-gray-900 dark:text-white">
        Type or ruleset summary
      </div>

      <div class="flex flex-col space-y-2">
        <AppRevisionInfo
          :revision="6"
          :date="new Date()"
          status="published"
          name="Edwin Groenendaal"></AppRevisionInfo>
        <AppRevisionInfo
          :revision="6"
          :date="coupleDaysAgo"
          status="published"
          name="Edwin Groenendaal"></AppRevisionInfo>
        <AppRevisionInfo
          :revision="6"
          :date="new Date('2022-10-12')"
          status="draft"
          name="Edwin Groenendaal"></AppRevisionInfo>
        <AppRevisionInfo
          :revision="6"
          :date="new Date('2020-10-12')"
          status="draft"
          name="Edwin Groenendaal"></AppRevisionInfo>
      </div>
      <div class="font-medium text-gray-900 dark:text-white">
        Revision information
      </div>

      <div class="mt-8 flex flex-col space-y-2">
        <AppRevisionHistory :revisions="revisions"></AppRevisionHistory>
      </div>
      <div class="mt-8 font-medium text-gray-900 dark:text-white">
        Revision history
      </div>
      <div class="mt-8 flex flex-col space-y-2">
        <AppValidationError class="max-w-[300px]"
          >An error has occurred</AppValidationError
        >
        <AppValidationError class="max-w-[300px]"
          >An error has occurred, and there is a long explanation of what has
          gone wrong. In case it&rsquo;s important.</AppValidationError
        >
      </div>
      <div class="mt-8 font-medium text-gray-900 dark:text-white">
        Revision history
      </div>
    </div>
  </div>
</template>
<style>
  :root {
    color-scheme: light;
  }
</style>
