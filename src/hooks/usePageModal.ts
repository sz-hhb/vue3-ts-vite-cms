import { ref } from "vue"
import PageModal from "@/components/page-modal/PageModal.vue"

type CallbackFnType = (data?: any) => void

function usePageModal(newCallback?: CallbackFnType, editCallback?: CallbackFnType) {
  const modalRef = ref<InstanceType<typeof PageModal>>()
  const handleNewClick = () => {
    modalRef.value?.setModalVisible()
    newCallback && newCallback()
  }
  const handleEditClick = (itemData: any) => {
    modalRef.value?.setModalVisible(false, itemData)
    editCallback && editCallback(itemData)
  }

  return { modalRef, handleNewClick, handleEditClick }
}

export default usePageModal
