import { ref } from "vue"
import PageModal from "@/components/page-modal/PageModal.vue"

function usePageModal() {
  const modalRef = ref<InstanceType<typeof PageModal>>()
  const handleNewClick = () => {
    modalRef.value?.setModalVisible()
  }
  const handleEditClick = (itemData: any) => {
    modalRef.value?.setModalVisible(false, itemData)
  }

  return { modalRef, handleNewClick, handleEditClick }
}

export default usePageModal
