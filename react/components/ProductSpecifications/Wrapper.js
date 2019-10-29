import React from 'react'
import useProduct from 'vtex.product-context/useProduct'
import { isEmpty, propOr, propEq } from 'ramda'

import ProductSpecifications from './index'

const getSpecifications = productContext => {
  if (!productContext || isEmpty(productContext)) {
    return []
  }
  const { product } = productContext
  const specificationGroups = propOr([], 'specificationGroups', product)
  const groupWithAll = specificationGroups.find(
    propEq('name', 'allSpecifications')
  )
  const allSpecifications = groupWithAll ? groupWithAll.specifications : []
  return allSpecifications
}

const ProductSpecificationsWrapper = ({
  hiddenSpecifications,
  visibleSpecifications,
  specifications: propsSpecifications,
  tabsMode, // This is a legacy prop passed by product-details
  showSpecificationsTab = false,
}) => {
  const productContext = useProduct()

  const specifications =
    propsSpecifications || getSpecifications(productContext)
  return (
    <ProductSpecifications
      hiddenSpecifications={hiddenSpecifications}
      visibleSpecifications={visibleSpecifications}
      tabsMode={tabsMode != null ? tabsMode : showSpecificationsTab}
      specifications={specifications}
    />
  )
}

ProductSpecificationsWrapper.getSchema = () => {
  return {
    "title": "admin/editor.product-specifications.title",
    "description": "",
    "type": "object",
    "properties": {
      "hiddenSpecifications": {
        "items": {
          "type": "string",
          "title": "admin/editor.product-specifications.items-title"
        },
        "minItems": 0,
        "title": "admin/editor.product-specifications.title",
        "type": "array",
      },
    },
  }
}

export default ProductSpecificationsWrapper
