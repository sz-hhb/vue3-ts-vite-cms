import { ref } from "vue"
import PageContent from "@/components/page-content/PageContent.vue"

function usePageContent() {
  const contentRef = ref<InstanceType<typeof PageContent>>()
  const handleResetClick = () => {
    contentRef.value?.fetchPageListData()
  }
  const handleQueryClick = (queryInfo: any) => {
    contentRef.value?.fetchPageListData(queryInfo)
  }

  return { contentRef, handleResetClick, handleQueryClick }
}

export default usePageContent
