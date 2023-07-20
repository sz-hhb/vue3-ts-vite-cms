import { ref } from "vue"
import PageModal from "@/components/page-modal/PageModal.vue"

type editFnType = (data: any) => void

function usePageModal(editCallback: editFnType) {
  const modalRef = ref<InstanceType<typeof PageModal>>()
  const handleNewClick = () => {
    modalRef.value?.setModalVisible()
  }
  const handleEditClick = (itemData: any) => {
    modalRef.value?.setModalVisible(false, itemData)
    editCallback && editCallback(itemData)
  }

  return { modalRef, handleNewClick, handleEditClick }
}

export default usePageModal
