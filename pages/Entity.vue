<template>
  <CFlex background-color="gray.50" flex="1 0" direction="row">
    <CBox :width="$chakra.theme.container" mx="auto" background-color="white">
      <CFlex p="4" align="center">
        <CStack is-inline :spacing="4" align="center">
          <CIcon name="star" size="2rem" />
          <CEditable :defaultValue="display" font-size="4xl" font-weight="700">
            <CEditablePreview />
            <CEditableInput />
          </CEditable>
        </CStack>
        <CStack is-inline :spacing="4" align="center" ml="auto">
          <CBadge font-size="md" variant="outline" rounded="4px">
            Revision {{ version }}
          </CBadge>
          <CFlex
            font-weight="700"
            color="white"
            background-color="green.600"
            rounded="0.25rem"
            justify="center"
            align="center"
            h="10"
            px="4"
          >
            Published
          </CFlex>
          <CText>12 days ago</CText>
          <CButton>History</CButton>
        </CStack>
      </CFlex>
      <CFlex px="4" py="2" align="center">
        <CText>
          {{ description }}
        </CText>
      </CFlex>
      <CStack is-inline px="4" py="2" align="center">
        <CText font-weight="500">Tag:</CText>
        <CBox
          font-family="mono"
          font-size="sm"
          px="2"
          py="1"
          font-weight="500"
          background-color="gray.100"
          rounded="2px"
        >
          {{ name }}
        </CBox>
        <CBadge
          variant-color="yellow"
          rounded="4px"
          v-for="tag in tags"
          :key="tag"
        >
        {{ tag }}
        </CBadge>
      </CStack>

      <CBox as="section" p="4">
        <CHeading as="h3" size="lg" mb="2">Fields</CHeading>
        <CBox border-color="gray.300" border-width="1px" rounded="5px" p="4">
          <CStack spacing="0">
            <CBox
              v-for="field in definition"
              :key="field.name"
              border-bottom-width="1px"
              py="2"
            >
              <CStack :spacing="2" is-inline align="center">
                <CText font-weight="500">{{ field.name }}</CText>
                <CBadge>{{ field.type }}</CBadge>
                <CText ml="auto" color="gray.600">{{ field.description || 'No description' }}</CText>
              </CStack>
            </CBox>
          </CStack>
        </CBox>
        <CFlex mt="4" align="center">
          <CLink font-weight="700">Add another field</CLink>
          <CButton ml="auto" isDisabled>Apply changes</CButton>
        </CFlex>
      </CBox>
      <CBox as="section" p="4">
        <CHeading as="h3" size="lg" mb="2">Rule sets</CHeading>
        <CText>The <CBox as="span" font-weight="500">{{ display }}</CBox> entity is used in the following rule sets:</CText>
        <CStack :spacing="2" my="4">
          <CStack is-inline :spacing="2" align="center">
            <CIcon name="star" />
            <CText font-weight="500">Is eligible for VAT</CText>
            <CBadge font-size="md" variant-color="green" variant="solid" rounded="4px">Rev 1</CBadge>
            <CIcon name="chevron-right" size="1.5rem" ml="8" />
            <CIcon name="star" ml="8" />
            <CBox as="span" font-weight="500">{{ display }}</CBox>
            <CBadge font-size="md" variant="outline" rounded="4px">Rev 1</CBadge>
            <CText>12 days ago</CText>
          </CStack>
        </CStack>
      </CBox>
    </CBox>
  </CFlex>
</template>

<script>
import {
  CBadge,
  CBox,
  CButton,
  CEditable,
  CEditableInput,
  CEditablePreview,
  CFlex,
  CHeading,
  CLink,
  CStack,
  CIcon,
  CText
} from '@chakra-ui/vue'

export default {
  components: {
    CBadge,
    CBox,
    CButton,
    CEditable,
    CEditableInput,
    CEditablePreview,
    CFlex,
    CHeading,
    CLink,
    CIcon,
    CStack,
    CText
  },
  data () {
    return {
      name: 'invoice',
      description: 'An invoice represents a single invoice with line items and a total value, as well as the invoice address.',
      display: 'Invoice',
      tags: ['Invoicing', 'Demo'],
      version: 2,
      isLatest: true,
      definition: [
        { name: 'Name', type: 'Text' },
        { name: 'Adress', type: 'Text' },
        { name: 'Total', type: 'Number' },
        {
          name: 'Line items',
          type: 'Array',
          of: [
            { name: 'Product', type: 'Text' },
            { name: 'Quantity', type: 'Number' },
            { name: 'Unit price', type: 'Number' },
            { name: 'Total', type: 'Number' }
          ]
        }
      ]
    }
  }
}
</script>

<style>
</style>
