<template>
  <CFlex background-color="gray.50" flex="1 0" direction="row">
    <CBox :width="$chakra.theme.container" mx="auto" background-color="white">
      <CFlex p="4" align="center">
        <CStack is-inline :spacing="4" align="center">
          <CIcon name="star" size="2rem" />
          <CEditable :default-value="display" font-size="4xl" font-weight="700">
            <CEditablePreview />
            <CEditableInput />
          </CEditable>
        </CStack>
        <CStack is-inline :spacing="4" align="center" ml="auto">
          <CBadge font-size="md" variant="outline" rounded="4px">
            Rev {{ version }}
          </CBadge>
          <CText>12 days ago</CText>
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
          <CButton>History</CButton>
        </CStack>
      </CFlex>
      <CFlex px="4" py="2" align="center">
        <CText>
          {{ description }}
        </CText>
      </CFlex>
      <CStack is-inline px="4" py="2" align="center">
        <CText font-weight="500">
          Type:
        </CText>
        <CBox px="2" py="1" font-weight="500" background-color="gray.100" rounded="2px">
          {{ type }}
        </CBox>
        <CText font-weight="500">
          Tag:
        </CText>
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
          v-for="tag in tags"
          :key="tag"
          variant-color="yellow"
          rounded="4px"
        >
          {{ tag }}
        </CBadge>
      </CStack>
      <CAlert status="warning" m="4" rounded="4px">
        <CAlertIcon />
        <div>
          The
          <CBox as="span" font-weight="500">
            {{ display }}
          </CBox>
          ruleset uses an older version of the
          <CBox as="span" font-weight="500">
            {{ entity.display }}
          </CBox>
          entity.
          Update to create a new draft version of the ruleset based
          on the latest
          <CBox as="span" font-weight="500">
            {{ entity.display }}
          </CBox>
          entity.
        </div>
      </CAlert>
      <CStack is-inline px="4" py="2" align="center">
        <CText font-weight="500">
          Entity:
        </CText>
        <CIcon name="star" />
        <CBox as="span" font-weight="500">
          {{ entity.display }}
        </CBox>
        <CBadge font-size="md" variant="outline" rounded="4px">
          rev {{ entity.version }}
        </CBadge>
        <CText>{{ entity.date }}</CText>
        <CIcon name="chevron-right" size="1.5rem" />
        <CIcon name="star" />
        <CBox as="span" font-weight="500">
          {{ display }}
        </CBox>
        <CBadge font-size="md" variant-color="green" variant="solid" rounded="4px">
          rev {{ latestEntity.version }}
        </CBadge>
        <CText>{{ latestEntity.date }}</CText>
        <CButton ml="auto">
          Update version
        </CButton>
      </CStack>

      <CBox as="section" p="4">
        <CHeading as="h3" size="lg" mb="2">
          Rules
        </CHeading>

        <CStack
          py="2"
          align="center"
          is-inline
        >
          <CFlex
            align="center"
            justify="center"
            rounded="full"
            border-width="1px"
            w="6"
            h="6"
          >
            1
          </CFlex>
          <CText as="span">
            When
          </CText>
          <CBox
            px="2"
            py="1"
            font-weight="500"
            background-color="gray.100"
            rounded="2px"
          >
            Amount
          </CBox>
          <CText>is larger than</CText>
          <CBox
            px="2"
            py="1"
            rounded="4px"
            background-color="white"
            border-width="1px"
            font-family="mono"
          >
            1000
          </CBox>
          <CIcon name="arrow-forward" />
          <CText>Outcome is</CText>
          <CBox
            px="2"
            py="1"
            font-weight="500"
            background-color="gray.100"
            rounded="2px"
          >
            Pass
          </CBox>
          <CButton ml="auto">
            Edit
          </CButton>
        </CStack>
      </CBox>

      <CBox as="section" p="4">
        <CStack is-inline align="center">
          <CHeading flex="1" as="h3" size="lg" mb="2">
            Test cases
          </CHeading>
          <CIcon name="check-circle" color="green.600" />
          <CText font-weight="500">
            3
          </CText>
          <CIcon name="exclamation" color="gray.400" />
          <CText font-weight="500" color="gray.400">
            0
          </CText>
        </CStack>
        <CAccordion border="none">
          <CAccordionItem border="none" mb="4">
            <CAccordionHeader
              background-color="green.100"
              rounded="4px"
              p="2"
              align="center"
            >
              <CStack flex="1" is-inline align="center">
                <CIcon name="check-circle" color="green.600" />
                <CText>Should trigger when value greater than threshold</CText>
              </CStack>
              <CAccordionIcon />
            </CAccordionHeader>
            <CAccordionPanel>
              <CSimpleGrid :columns="2" :spacing="4">
                <CBox>
                  <CHeading as="h3" size="md" mb="1">
                    Test data
                  </CHeading>
                  <CBox as="pre" background-color="gray.100" rounded="4px" p="2">
                    { "amount": 1200 }
                  </CBox>
                </CBox>
                <CBox>
                  <CHeading as="h3" size="md" mb="1">
                    Assertions
                  </CHeading>
                  <CStack is-inline p="2" align="center">
                    <CBox background-color="green.600" rounded="full" w="2" h="2" />
                    <CText font-weight="500">
                      Assert that:
                    </CText>
                    <CText ml="auto">
                      Outcome is
                    </CText>
                    <CBox
                      px="2"
                      py="1"
                      font-weight="500"
                      background-color="gray.100"
                      rounded="2px"
                    >
                      Pass
                    </CBox>
                  </CStack>
                </CBox>
              </CSimpleGrid>
            </CAccordionPanel>
          </CAccordionItem>
          <CAccordionItem border="none" mb="4">
            <CAccordionHeader
              background-color="green.100"
              rounded="4px"
              p="2"
              align="center"
            >
              <CStack flex="1" is-inline align="center">
                <CIcon name="check-circle" color="green.600" />
                <CText>Should not trigger when value less than threshold</CText>
              </CStack>
              <CAccordionIcon />
            </CAccordionHeader>
            <CAccordionPanel>
              <CSimpleGrid :columns="2" :spacing="4">
                <CBox>
                  <CHeading as="h3" size="md" mb="1">
                    Test data
                  </CHeading>
                  <CBox as="pre" background-color="gray.100" rounded="4px" p="2">
                    { "amount": 1200 }
                  </CBox>
                </CBox>
                <CBox>
                  <CHeading as="h3" size="md" mb="1">
                    Assertions
                  </CHeading>
                  <CStack is-inline p="2" align="center">
                    <CBox background-color="green.600" rounded="full" w="2" h="2" />
                    <CText font-weight="500">
                      Assert that:
                    </CText>
                    <CText ml="auto">
                      Outcome is
                    </CText>
                    <CBox
                      px="2"
                      py="1"
                      font-weight="500"
                      background-color="gray.100"
                      rounded="2px"
                    >
                      Fail
                    </CBox>
                  </CStack>
                </CBox>
              </CSimpleGrid>
            </CAccordionPanel>
          </CAccordionItem>
          <CAccordionItem border="none">
            <CAccordionHeader
              background-color="green.100"
              rounded="4px"
              p="2"
              align="center"
            >
              <CStack flex="1" is-inline align="center">
                <CIcon name="check-circle" color="green.600" />
                <CText>Should not trigger when value equal to threshold</CText>
              </CStack>
              <CAccordionIcon />
            </CAccordionHeader>
            <CAccordionPanel>
              <CSimpleGrid :columns="2" :spacing="4">
                <CBox>
                  <CHeading as="h3" size="md" mb="1">
                    Test data
                  </CHeading>
                  <CBox as="pre" background-color="gray.100" rounded="4px" p="2">
                    { "amount": 1200 }
                  </CBox>
                </CBox>
                <CBox>
                  <CHeading as="h3" size="md" mb="1">
                    Assertions
                  </CHeading>
                  <CStack is-inline p="2" align="center">
                    <CBox background-color="green.600" rounded="full" w="2" h="2" />
                    <CText font-weight="500">
                      Assert that:
                    </CText>
                    <CText ml="auto">
                      Outcome is
                    </CText>
                    <CBox
                      px="2"
                      py="1"
                      font-weight="500"
                      background-color="gray.100"
                      rounded="2px"
                    >
                      Fail
                    </CBox>
                  </CStack>
                </CBox>
              </CSimpleGrid>
            </CAccordionPanel>
          </CAccordionItem>
        </CAccordion>
      </CBox>
    </CBox>
  </CFlex>
</template>

<script>
import {
  CAccordion,
  CAccordionHeader,
  CAccordionIcon,
  CAccordionItem,
  CAccordionPanel,
  CAlert,
  CAlertIcon,
  CBadge,
  CBox,
  CButton,
  CEditable,
  CEditableInput,
  CEditablePreview,
  CFlex,
  CHeading,
  CIcon,
  CSimpleGrid,
  CStack,
  CText
} from '@chakra-ui/vue'

export default {
  components: {
    CAccordion,
    CAccordionHeader,
    CAccordionIcon,
    CAccordionItem,
    CAccordionPanel,
    CAlert,
    CAlertIcon,
    CBadge,
    CBox,
    CButton,
    CEditable,
    CEditableInput,
    CEditablePreview,
    CFlex,
    CHeading,
    CIcon,
    CSimpleGrid,
    CStack,
    CText
  },
  data () {
    return {
      name: 'is-eligible-for-vat',
      description: 'This ruleset determines if a invoice should have VAT added to it.',
      display: 'Is eligible for VAT',
      tags: ['Invoicing', 'Demo'],
      type: 'Pass/fail filter',
      version: 1,
      isLatest: true,
      entity: { name: 'invoice', display: 'Invoice', version: 1, date: '5 July 2020' },
      latestEntity: { version: 2, date: '12 days ago' }
    }
  }
}
</script>

<style>
</style>
