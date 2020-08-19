<template>
  <CFlex background-color="gray.50" flex="1 0" direction="row">
    <CBox :width="$chakra.theme.container" mx="auto" background-color="white">
      <CFlex p="4" align="center">
        <CHeading as="h2" font-size="4xl">
          Entities
        </CHeading>
        <CButton ml="auto">
          Add entity
        </CButton>
      </CFlex>
      <CBox as="section" p="4">
        <CStack spacing="4">
          <CBox v-if="$fetchState.pending" py="2">
            Retrieving entities
          </CBox>
          <CBox v-else-if="0 == entities.length" py="2">
            No entities available
          </CBox>
          <CPseudoBox
            v-for="entity in entities"
            v-else
            :key="entity.id"
            :_hover="{ bg: 'gray.100' }"
          >
            <CStack is-inline spacing="4" align="center">
              <CText font-weight="500">
                {{ entity.display_name }}
              </CText>
              <CBadge font-size="md" variant="outline" rounded="4px">
                Revision {{ entity.revision.revision }}
              </CBadge>
              <CBadge v-for="tag in entity.tags" :key="tag">
                {{ tag }}
              </CBadge>
              <CStack is-inline spacing="4" ml="auto" align="center">
                <CText>
                  {{ entity.revision.updated_by }}
                </CText>
                <CText>
                  {{ entity.date_created }}
                </CText>
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
                  {{ entity.revision.status }}
                </CFlex>
              </CStack>
            </CStack>
          </CPseudoBox>
        </CStack>
      </CBox>
    </CBox>
  </CFlex>
</template>
<script>
import { CBadge, CBox, CButton, CFlex, CHeading, CPseudoBox, CStack, CText } from '@chakra-ui/vue'

export default {
  components: {
    CBadge,
    CBox,
    CButton,
    CFlex,
    CHeading,
    CPseudoBox,
    CStack,
    CText
  },
  async fetch () {
    try {
      const { $axios } = this.$nuxt.context
      const { data } = await $axios.get(
        `http://localhost:7071/api/${this.$route.params.tenant}/entity`
      )
      this.entities = data
    } catch (err) {
      console.log('ERR')
      console.log(err)
    }
  },
  data () {
    return {
      entities: []
    }
  }
}
</script>
